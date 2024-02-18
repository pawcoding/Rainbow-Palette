import { Injectable, inject } from '@angular/core';
import { Subject, catchError, first, firstValueFrom, timeout } from 'rxjs';
import {
  WebWorkerRequest,
  WebWorkerResponse,
} from '../interfaces/web-worker-messages.interface';
import { Color } from '../model/color.model';
import { Shade } from '../model/shade.model';
import { ToastService } from './toast.service';
import { WebWorkerService } from './web-worker.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private readonly _webWorkerService = inject(WebWorkerService);
  private readonly _toastService = inject(ToastService);

  constructor() {
    const worker = new Worker(new URL('./color.worker', import.meta.url));
    this._webWorkerService.registerWorker('regenerate', worker);
  }

  public async regenerateShades(color: Color): Promise<void> {
    try {
      const result = await this._webWorkerService.postMessage({
        type: 'regenerate',
        shadesString: color.shades.map((shade) => shade.toString()),
      });

      color.shades = result.shadesString.map((shade) => Shade.parse(shade));
    } catch {
      this._toastService.showToast({
        type: 'error',
        message: 'Failed to generate new shades for color.',
      });
    }
  }
}
