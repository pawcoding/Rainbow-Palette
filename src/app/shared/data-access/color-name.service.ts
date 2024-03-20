import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Shade } from '../model/shade.model';
import { HSLObject } from '../types/color-format';
import { ToastService } from './toast.service';

interface ColorMapEntry {
  hue: number;
  saturation: number;
  lightness: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorNameService {
  private readonly _http = inject(HttpClient);
  private readonly _toastService = inject(ToastService);

  private colorDictionary?: Array<ColorMapEntry>;

  public async getColorName(shade: Shade): Promise<string> {
    if (!this.colorDictionary) {
      await this.loadColorMap();
    }

    if (!this.colorDictionary) {
      return shade.hex.substring(1);
    }

    const name = this.colorDictionary
      .filter((entry) => {
        if (shade.hsl.S === 0) {
          return entry.hue === -1;
        } else {
          return entry.hue !== -1;
        }
      })
      .map((entry) => ({
        name: entry.name,
        distance: this.calculateDistance(shade.hsl, entry)
      }))
      .sort((a, b) => a.distance - b.distance)
      .map((entry) => entry.name)
      .at(0);

    if (!name) {
      console.warn('No color name found for', shade.hex);
      return shade.hex.substring(1);
    }

    return name.replace(
      /(\w)(\w*)/g,
      (_, first, rest) => first.toUpperCase() + rest.toLowerCase()
    );
  }

  private async loadColorMap(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this._http.get('/assets/color-dictionary.csv', { responseType: 'text' })
      );

      this.colorDictionary = data
        .split('\n')
        .filter((_, index) => index > 0)
        .map((line) => line.split(';'))
        .map((entry) => ({
          name: entry[0],
          hue: parseInt(entry[1], 10),
          saturation: parseInt(entry[2], 10),
          lightness: parseInt(entry[3], 10)
        }));
    } catch (error) {
      this._toastService.showToast({
        type: 'error',
        message: 'toast.error.load-color-map'
      });
    }
  }

  private calculateDistance(hsl: HSLObject, entry: ColorMapEntry): number {
    return (
      10 * Math.abs(hsl.H - entry.hue) +
      5 * Math.abs(hsl.S - entry.saturation) +
      Math.abs(hsl.L - entry.lightness)
    );
  }
}

export class ColorNameServiceMock {
  public async getColorName(shade: Shade): Promise<string> {
    return shade.hex.substring(1);
  }
}
