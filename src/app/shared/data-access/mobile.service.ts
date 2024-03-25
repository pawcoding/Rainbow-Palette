import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';

const SM_QUERY_LIST = matchMedia('(min-width: 640px)');

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  public isMobile = toSignal(
    fromEvent<MediaQueryListEvent>(SM_QUERY_LIST, 'change').pipe(map((event) => !event.matches)),
    {
      initialValue: !SM_QUERY_LIST.matches
    }
  );
}

export class MobileServiceMock {
  public readonly isMobile = signal(false).asReadonly();
}
