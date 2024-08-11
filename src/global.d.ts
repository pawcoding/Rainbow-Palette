/**
 * Copy of the Chrome AI package types:
 * https://github.com/jeasonstudio/chrome-ai
 */

/**
 * Flags for whether a Chrome AI session is available.
 */
export type ChromeAISessionAvailable = 'no' | 'after-download' | 'readily';

/**
 * Information about the AI model.
 */
export interface ChromeAIModelInfo {
  /**
   * Default temperature of the model.
   * Higher temperature means the model will take more risks.
   *
   * Must be a number between 0 and 1.
   */
  defaultTemperature: number;
  defaultTopK: number;
  maxTopK: number;
}

/**
 * Options for creating a new AI session.
 */
export interface ChromeAISessionOptions {
  /**
   * Temperature of the model.
   * Higher temperature means the model will take more risks.
   *
   * Must be a number between 0 and 1.
   */
  temperature?: number;
  topK?: number;
}

/**
 * A Chrome AI session.
 */
export interface ChromeAISession {
  /**
   * Destroys the session.
   */
  destroy: () => Promise<void>;
  /**
   * Prompts the model with a given prompt and returns the model's response.
   */
  prompt: (prompt: string) => Promise<string>;
  /**
   * Prompts the model with a given prompt and streams the model's response.
   */
  promptStreaming: (prompt: string) => ReadableStream<string>;
}

/**
 * The Chrome AI prompt API.
 */
export interface ChromePromptAPI {
  /**
   * Checks if a generic AI session can be created.
   */
  canCreateTextSession: () => Promise<ChromeAISessionAvailable>;
  /**
   * Gets information about the text model.
   */
  textModelInfo: () => Promise<ChromeAIModelInfo>;
  /**
   * Creates a new text AI session.
   */
  createTextSession: (options?: ChromeAISessionOptions) => Promise<ChromeAISession>;
}

/**
 * Options for the Chrome AI polyfill.
 */
export interface PolyfillChromeAIOptions {
  /**
   * Path to the model asset.
   */
  modelAssetPath: string;
  /**
   * Path to the model metadata.
   */
  wasmLoaderPath: string;
  /**
   * Path to the model binary.
   */
  wasmBinaryPath: string;
}

declare global {
  // eslint-disable-next-line no-var
  var ai: ChromePromptAPI | undefined;
  // eslint-disable-next-line no-var
  var model = ai;
  // eslint-disable-next-line no-var
  var __polyfill_ai_options__: Partial<PolyfillChromeAIOptions> | undefined;
}
