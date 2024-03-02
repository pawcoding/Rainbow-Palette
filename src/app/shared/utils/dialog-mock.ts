import { DialogConfig } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class DialogMock<T> {
  private readonly _returnValue: T;

  constructor(returnValue: T) {
    this._returnValue = returnValue;
  }

  public open(
    _component: ComponentType<unknown>,
    _config: DialogConfig
  ): { closed: Observable<unknown> } {
    const closeSubject = new Subject<T>();
    const dialogRef = {
      closed: closeSubject.asObservable(),
    };

    setTimeout(() => {
      closeSubject.next(this._returnValue);
    }, 10);

    return dialogRef;
  }
}
