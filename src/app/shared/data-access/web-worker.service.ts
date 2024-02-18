import { Injectable, inject } from '@angular/core';
import { Subject, catchError, first, firstValueFrom, timeout } from 'rxjs';
import {
  WebWorkerRequest,
  WebWorkerResponse,
} from '../interfaces/web-worker-messages.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class WebWorkerService {
  private readonly _toastService = inject(ToastService);

  private readonly _workers = new Map<string, Worker>();
  private readonly _result = new Subject<WebWorkerResponse>();

  constructor() {
    if (typeof Worker === 'undefined') {
      this._toastService.showToast({
        type: 'error',
        message: 'Web Workers are not supported in this environment.',
      });
    }
  }

  public registerWorker(type: WebWorkerRequest['type'], worker: Worker): void {
    worker.onmessage = ({ data }: { data: WebWorkerResponse }) => {
      this._result.next(data);
    };

    this._workers.set(type, worker);
  }

  public async postMessage(
    message: WebWorkerRequest
  ): Promise<WebWorkerResponse> {
    const worker = this._workers.get(message.type);

    if (!worker) {
      throw new Error('Worker not found.');
    }

    if (!message.id) {
      message.id = crypto.randomUUID();
    }

    worker.postMessage(message);

    return firstValueFrom(
      this._result.pipe(
        timeout(5000),
        first(
          (result) => result.id === message.id && result.type === message.type
        ),
        catchError((e) => {
          console.error(e);
          throw new Error('Failed to process request in Web Worker.');
        })
      )
    );
  }
}
