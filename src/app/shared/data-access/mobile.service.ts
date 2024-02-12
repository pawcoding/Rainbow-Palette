import { Injectable, Signal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private readonly _resize: Signal<Event | undefined>;
  private readonly _isMobile = signal(false);

  public get isMobile(): Signal<boolean> {
    return this._isMobile.asReadonly();
  }

  constructor() {
    const resize$ = fromEvent(window, 'resize');
    this._resize = toSignal(resize$);

    effect(
      () => {
        if (!this._resize) {
          return;
        }

        if (this._resize()?.target) {
          const target = this._resize()?.target as Window;

          this._isMobile.set(target.innerWidth < 640);
        }
      },
      {
        allowSignalWrites: true,
      }
    );

    this._isMobile.set(window.innerWidth < 640);
  }
}
