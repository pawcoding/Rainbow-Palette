/**
 * Flags for whether a Chrome AI session is available.
 */
export type ChromeAISessionAvailable = 'no' | 'readily';

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
  temperature: number;
  topK: number;
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
  /**
   * Executes the model with a given prompt and returns the model's response.
   */
  execute: (prompt: string) => Promise<string>;
  /**
   * Executes the model with a given prompt and streams the model's response.
   */
  executeStreaming: (prompt: string) => ReadableStream<string>;
}

/**
 * The Chrome AI prompt API.
 */
export interface ChromePromptAPI {
  /**
   * Checks if a generic AI session can be created.
   */
  canCreateGenericSession: () => Promise<ChromeAISessionAvailable>;
  /**
   * Checks if a text AI session can be created.
   */
  canCreateTextSession: () => Promise<ChromeAISessionAvailable>;
  /**
   * Gets the default options for a generic AI session.
   */
  defaultGenericSessionOptions: () => Promise<ChromeAISessionOptions>;
  /**
   * Gets the default options for a text AI session.
   */
  defaultTextSessionOptions: () => Promise<ChromeAISessionOptions>;
  /**
   * Creates a new generic AI session.
   */
  createGenericSession: (options?: ChromeAISessionOptions) => Promise<ChromeAISession>;
  /**
   * Creates a new text AI session.
   */
  createTextSession: (options?: ChromeAISessionOptions) => Promise<ChromeAISession>;
}

declare global {
  // eslint-disable-next-line no-var
  var ai: ChromePromptAPI | undefined;
  // eslint-disable-next-line no-var
  var model = ai;
}
