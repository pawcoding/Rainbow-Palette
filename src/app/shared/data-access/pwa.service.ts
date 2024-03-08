import { Injectable, Signal, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private readonly _isPwa = signal(false);
  private readonly _pwaInstalled = new Subject<void>();

  public get isPwa(): Signal<boolean> {
    return this._isPwa.asReadonly();
  }

  public get pwaInstalled(): Observable<void> {
    return this._pwaInstalled.asObservable();
  }

  constructor() {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      //@ts-expect-error
      window.navigator.standalone
    ) {
      this._isPwa.set(true);
    }

    window.addEventListener('appinstalled', () => {
      this._isPwa.set(true);
      this._pwaInstalled.next();
    });
  }
}
