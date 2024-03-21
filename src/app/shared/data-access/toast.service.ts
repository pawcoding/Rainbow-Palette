import { GlobalPositionStrategy, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Signal, effect, inject, signal } from '@angular/core';
import { Toast, ToastTimeouts } from '../interfaces/toast.interface';
import { ToastComponent } from '../ui/toast/toast.component';
import { MobileService } from './mobile.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _overlay = inject(Overlay);
  private readonly _mobileService = inject(MobileService);

  private readonly _toast = signal<Toast | undefined>(undefined);

  public get toast(): Signal<Toast | undefined> {
    return this._toast.asReadonly();
  }

  private _hideToast: ReturnType<typeof setTimeout> | undefined;
  private _positionStrategy: PositionStrategy | undefined;
  private _overlayRef: OverlayRef | undefined;

  public constructor() {
    // Create an overlay for the toast.
    this._overlayRef = this._overlay.create();

    effect(() => {
      // If there is no toast, clear the timeout and return.
      if (!this._toast()) {
        if (this._hideToast) {
          clearTimeout(this._hideToast);
        }
        this._hideToast = undefined;
        return;
      }

      // If there was a previous timeout, clear it.
      if (this._hideToast) {
        clearTimeout(this._hideToast);
        this._hideToast = undefined;
      }

      // Set a new timeout to hide the toast.
      this._hideToast = setTimeout(
        () => {
          this._toast.set(undefined);
        },
        ToastTimeouts[this._toast()!.type ?? 'default']
      );
    });

    // Attach the toast component to the overlay.
    effect(() => {
      if (this._toast()) {
        if (!this._overlayRef) {
          return;
        }

        this._overlayRef.detach();
        const toastPortal = new ComponentPortal(ToastComponent);
        const toastComponent = this._overlayRef.attach(toastPortal);
        toastComponent.setInput('toast', this._toast());
        const closeSubscription = toastComponent.instance.close.subscribe(() => {
          this.hideToast();
          closeSubscription.unsubscribe();
        });
      } else {
        this._overlayRef?.detach();
      }
    });

    // Update the position strategy based on the device type.
    effect(() => {
      if (this._mobileService.isMobile()) {
        this._positionStrategy = new GlobalPositionStrategy().top('0.5rem').centerHorizontally();
      } else {
        this._positionStrategy = new GlobalPositionStrategy().bottom('0.5rem').end('0.5rem');
      }

      this._overlayRef?.updatePositionStrategy(this._positionStrategy);
    });
  }

  /**
   * Shows the toast.
   *
   * @param toast The toast to be displayed.
   */
  public showToast(toast: Toast): void {
    this._toast.set(toast);
  }

  /**
   * Hides the toast.
   */
  public hideToast(): void {
    this._toast.set(undefined);
  }
}

export class ToastServiceMock {
  private readonly _toast = signal<Toast | undefined>({
    type: 'test',
    message: 'test'
  });

  public get toast(): Signal<Toast | undefined> {
    return this._toast.asReadonly();
  }

  public showToast(toast: Toast): void {
    this._toast.set(toast);
  }

  public hideToast(): void {
    this._toast.set(undefined);
  }
}
