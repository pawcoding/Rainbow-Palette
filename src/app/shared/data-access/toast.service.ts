import { GlobalPositionStrategy, Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Signal, effect, inject, signal } from '@angular/core';
import { Toast, ToastTimeouts } from '../interfaces/toast.interface';
import { ToastStackComponent } from '../ui/toast-stack/toast-stack.component';
import { MobileService } from './mobile.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly _overlay = inject(Overlay);
  private readonly _mobileService = inject(MobileService);

  private readonly _toastStack = signal<Array<Toast>>([]);

  public get toastStack(): Signal<Array<Toast>> {
    return this._toastStack.asReadonly();
  }

  private _positionStrategy: PositionStrategy | undefined;
  private _overlayRef: OverlayRef | undefined;

  public constructor() {
    // Create an overlay for the toast.
    this._overlayRef = this._overlay.create();

    // Attach the toast stack component to the overlay.
    effect(() => {
      if (this._toastStack().length > 0) {
        if (!this._overlayRef) {
          return;
        }

        this._overlayRef.detach();
        const toastPortal = new ComponentPortal(ToastStackComponent);
        this._overlayRef.attach(toastPortal);
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
  public showToast(toast: Toast): number {
    const timestamp = Date.now();
    toast.id = timestamp;
    toast.timeout = setTimeout(
      () => {
        this.hideToast(timestamp);
      },
      ToastTimeouts[toast.type ?? 'default']
    );

    this._toastStack.update((stack) => [...stack, toast]);
    return timestamp;
  }

  /**
   * Hides the toast.
   */
  public hideToast(id: number): void {
    const toast = this._toastStack().find((t) => t.id === id);
    if (!toast) {
      return;
    }

    clearTimeout(toast.timeout);
    this._toastStack.update((stack) => stack.filter((t) => t.id !== id));
  }
}

export class ToastServiceMock {
  private readonly _toastStack = signal<Array<Toast>>([
    {
      type: 'test',
      message: 'test'
    }
  ]);

  public get toastStack(): Signal<Array<Toast>> {
    return this._toastStack.asReadonly();
  }

  public showToast(toast: Toast): number {
    const timestamp = Date.now();
    toast.id = timestamp;
    this._toastStack.update((stack) => [...stack, toast]);
    return timestamp;
  }

  public hideToast(id: number): void {
    this._toastStack.update((stack) => stack.filter((t) => t.id !== id));
  }
}
