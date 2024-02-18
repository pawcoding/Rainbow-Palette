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
    console.info(
      `    Angular:\t${this.angularVersion}\n    App:\t${this.appVersion}`
    );
  }
}
