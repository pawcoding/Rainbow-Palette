import { OverlayModule } from '@angular/cdk/overlay';
import { Component, computed, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMarkMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../data-access/toast.service';

@Component({
  selector: 'rp-toast',
  standalone: true,
  imports: [OverlayModule, TranslateModule, NgIconComponent],
  templateUrl: './toast.component.html',
  providers: [
    provideIcons({
      heroXMarkMini,
    }),
  ],
})
export class ToastComponent {
  private readonly _toastService = inject(ToastService);

  protected readonly toast = this._toastService.toast;

  protected readonly colors = computed(() => {
    if (!this.toast()) {
      return '';
    }

    switch (this.toast()!.type) {
      case 'success':
        return 'bg-green-400 border-green-500 dark:bg-green-700 dark:border-green-600';
      case 'error':
        return 'bg-red-400 border-red-500 dark:bg-red-700 dark:border-red-600';
      case 'warning':
        return 'bg-yellow-400 border-yellow-500 dark:bg-yellow-700 dark:border-yellow-600';
      case 'info':
        return 'bg-blue-400 border-blue-500 dark:bg-blue-700 dark:border-blue-600';
      default:
        return 'bg-neutral-100 border-neutral-200 dark:bg-neutral-700 dark:border-neutral-600';
    }
  });

  protected closeToast(): void {
    this._toastService.hideToast();
  }
}
