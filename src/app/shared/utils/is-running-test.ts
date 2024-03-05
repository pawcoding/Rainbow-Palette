import { InjectionToken } from '@angular/core';

/**
 * Boolean indicating if the application is running in a test environment.
 * This is used in some places to skip certain timeouts to speed up test execution.
 */
export const IS_RUNNING_TEST = new InjectionToken<boolean>(
  'Boolean indicating if the application is running in a test environment. This is used in some places to skip certain timeouts to speed up test execution. This is used in some places to skip certain timeouts to speed up test execution..',
  {
    providedIn: 'root',
    factory: () => false,
  }
);
