import { Component, computed, inject } from '@angular/core';
import { MobileService } from '../../data-access/mobile.service';
import { ToastService } from '../../data-access/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'rp-toast-stack',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toast-stack.component.html'
})
export class ToastStackComponent {
  private readonly _toastService = inject(ToastService);
  private readonly _mobileService = inject(MobileService);

  protected readonly toastStack = computed(() => {
    const isMobile = this._mobileService.isMobile();
    const toastStack = this._toastService.toastStack();

    if (isMobile) {
      return toastStack.slice().reverse();
    } else {
      return toastStack;
    }
  });

  protected closeToast(id: number): void {
    this._toastService.hideToast(id);
  }
}
