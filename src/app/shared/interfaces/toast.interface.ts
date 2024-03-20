export const ToastTimeouts = {
  success: 3000,
  error: 10000,
  warning: 5000,
  info: 5000,
  default: 5000,
  test: 10
};

/**
 * The interface for the toast.
 */
export interface Toast {
  /**
   * The type of the toast.
   * The type is used to determine the timeout and styling of the toast.
   */
  type?: keyof typeof ToastTimeouts;
  /**
   * The message to be displayed in the toast.
   * It can be a string or a translation key.
   */
  message: string;
  /**
   * The parameters to be used in the translation.
   */
  parameters?: Record<string, unknown>;
}
