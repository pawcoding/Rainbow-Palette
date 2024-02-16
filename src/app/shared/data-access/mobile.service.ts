import { Injectable, Signal, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  private readonly _resize: Signal<Event | undefined>;
  private readonly _isMobile = signal(false);

  public get resize(): Signal<Event | undefined> {
    return this._resize;
  }

  public get isMobile(): Signal<boolean> {
    return this._isMobile.asReadonly();
  }

  constructor() {
    const resize$ = fromEvent(window, 'resize');
    this._resize = toSignal(resize$);

    effect(
      () => {
        // Reference resize signal to trigger computation on window resize
        if (!this._resize()) {
          return;
        }

        this._isMobile.set(window.innerWidth < 640);
      },
      {
        allowSignalWrites: true,
      }
    );

    this._isMobile.set(window.innerWidth < 640);
  }
}
