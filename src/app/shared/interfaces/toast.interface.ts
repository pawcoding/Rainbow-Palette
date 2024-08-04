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
  /**
   * Unique identifier of the toast.
   * This can be used to identify the toast when hiding it.
   * Usually, this value is automatically set to the timestamp when the toast is shown by the toast service.
   */
  id?: number;
  /**
   * The timeout for the toast.
   */
  timeout?: ReturnType<typeof setTimeout>;
  /**
   * Optional duration for the toast.
   * If provided, the toast will be displayed for the specified duration.
   * If not provided, the toast will use the default timeout based on the type.
   * If the duration is set to 0, the toast will not be automatically hidden.
   */
  duration?: number;
}
