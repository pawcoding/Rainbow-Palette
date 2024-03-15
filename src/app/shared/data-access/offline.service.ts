import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime, fromEvent, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfflineService {
  private readonly _isOffline = new BehaviorSubject(!navigator.onLine);

  public readonly isOffline = toSignal(this._isOffline, {
    initialValue: this._isOffline.value,
  });

  constructor() {
    merge(of(null), fromEvent(window, 'online'), fromEvent(window, 'offline'))
      .pipe(
        map(() => navigator.onLine),
        debounceTime(5000)
      )
      .subscribe((isOnline) => {
        this._isOffline.next(!isOnline);
      });
  }
}

export class OfflineServiceMock {
  public readonly isOffline = signal(false).asReadonly();
}
