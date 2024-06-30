import { Injectable, inject } from '@angular/core';
import { ChromeAISession } from '../../../global';
import { randomScheme } from '../constants/palette-scheme';
import { Color, Palette, Shade, Value } from '../model';
import { sleep } from '../utils/sleep';
import { ColorNameService } from './color-name.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  readonly #colorNameService = inject(ColorNameService);

  /**
   * Flag to indicate whether the local AI is available.
   */
  public readonly isAvailable = !!window.ai;

  /**
   * The AI session.
   */
  #session?: ChromeAISession;

  /**
   * Creates a new session with the local AI.
   */
  private async createSession(): Promise<ChromeAISession> {
    // Check if the AI is available
    if (!window.ai) {
      throw new Error('AI is not available');
    }

    // Check if a session already exists
    if (this.#session) {
      return this.#session;
    }

    // Create a new text session if possible
    const canCreateTextSession = await window.ai.canCreateTextSession();
    if (canCreateTextSession === 'readily') {
      const options = await window.ai.defaultTextSessionOptions();
      this.#session = await window.ai.createTextSession({
        ...options,
        temperature: 0.6
      });
      return this.#session;
    }

    // Create a new generic session if possible
    const canCreateGenericSession = await window.ai.canCreateGenericSession();
    if (canCreateGenericSession === 'readily') {
      const options = await window.ai.defaultGenericSessionOptions();
      this.#session = await window.ai.createGenericSession({
        ...options,
        temperature: 0.6
      });
      return this.#session;
    }

    // No session could be created
    throw new Error('AI is not available');
  }

  /**
   * Sends the given prompt to the AI and returns the response.
   * This method will throw an error if the AI takes too long to respond.
   */
  public async prompt(prompt: string): Promise<string> {
    // Check if the AI is available
    if (!this.isAvailable) {
      throw new Error('AI is not available');
    }

    // Create a new session if necessary
    if (!this.#session) {
      await this.createSession();
    }

    // Start timing the AI
    const start = Date.now();
    console.info('Prompting AI...');

    // Prompt the AI with a timeout
    const result = await Promise.race([
      // Prompt the AI
      this.#session!.prompt(prompt),
      // Wait for 10 seconds before timing out
      sleep(10000).then(() => false as const)
    ]);

    // Throw an error if the AI took too long to respond
    if (!result) {
      throw new Error('AI took too long to respond');
    }

    // Log the duration the AI took to respond
    const duration = Date.now() - start;
    console.info(`AI took ${duration}ms to respond`);

    return result.trim();
  }

  /**
   * Generate a palette fitting the given hex color using the local AI.
   */
  public async generatePalette(hex: string): Promise<Palette> {
    // Check if the AI is available
    if (!this.isAvailable) {
      throw new Error('AI is not available');
    }

    // Create the base color and palette
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const aiPalette = new Palette('AI (experimental)', []);

    aiPalette.addColor(new Color([shade], 'Primary'));

    /*
     * Retry up to 3 times if generation does not succeed.
     * This is necessary because the AI can sometimes take too long to
     * respond, respond in an unexpected format or not respond at all.
     */
    // Prompt the AI for a color palette
    for (let tries = 0; tries < 3; tries++) {
      try {
        // Use a random scheme to prime the AI
        const scheme = randomScheme().label.split('.')[1];
        console.info(`Generating a ${scheme} color palette...`);

        // Prompt the AI for a color palette
        let response = await this.prompt(
          `Generate a ${scheme} color palette with 3 to 7 colors using this as a starting point: "${hex}".
          Please return a JSON array of colors with the following format: \`[{hex: string, name: string}, nextColor, ...]\`.
          Always response in pure json string format that matches the JSON schema above, not markdown or other format!!`
        );

        // Remove markdown code block if present
        if (response.startsWith('```json')) {
          response = response.replaceAll('```json', '').replaceAll('```', '').trim();
        }

        // Attempt to parse the response as a JSON array of colors with hex and name properties
        let colors;
        try {
          colors = JSON.parse(response);
        } catch (error) {
          console.error(error, response);
          continue;
        }
        if (!Array.isArray(colors)) {
          if ('colors' in colors && Array.isArray(colors.colors)) {
            colors = colors.colors;
          } else {
            console.warn('Invalid response:', response);
            continue;
          }
        }

        // Loop through the generated colors and add them to the palette
        for (const color of colors) {
          // Check if the color is valid (has a hex property)
          if (typeof color !== 'object' || !color.hex) {
            console.warn('Invalid color:', color);
            continue;
          }

          // Skip the color if it is the same as the base color
          if (color.hex === hex) {
            continue;
          }

          // Create a shade and color from the generated hex code and add it to the palette
          const shade = new Shade(-1, Value.fromHEX(color.hex), true);
          const name = color.name || (await this.#colorNameService.getColorName(shade));
          aiPalette.addColor(new Color([shade], name));
        }

        // If the AI successfully generated at least one color, return the palette
        if (aiPalette.colors.length > 1) {
          return aiPalette;
        }
      } catch (error: any) {
        // If the AI took too long to respond, warn and continue, otherwise log the error
        if (error.message === 'AI took too long to respond') {
          console.warn('AI took too long to respond');
          continue;
        } else {
          console.error(error);
          continue;
        }
      }
    }

    // If the AI failed to generate a palette, throw an error
    throw new Error('AI failed to generate a palette');
  }
}
