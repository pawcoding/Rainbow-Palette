import { Injectable, VERSION } from '@angular/core';
import packageJson from '../../../../package.json';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  public readonly angularVersion = VERSION.full;
  public readonly appVersion = packageJson.version;

  constructor() {
    console.info(
      '%cRainbowPalette',
      'font-weight: bold; font-size: 1.1em; text-decoration: underline; margin-top: 1em;'
    );

    const angularVersionLength = this.angularVersion.length;
    const appVersionLength = this.appVersion.length;

    const length = Math.max(angularVersionLength, appVersionLength);
    const paddingAngular = ' '.repeat(length - angularVersionLength);
    const paddingApp = ' '.repeat(length - appVersionLength);

    console.info(
      `    Angular: ${paddingAngular}${this.angularVersion}\n    App:     ${paddingApp}${this.appVersion}`
    );
  }
}

export class VersionServiceMock {
  public readonly angularVersion = '0.0.0';
  public readonly appVersion = '0.0.0';
}
