import { OverlayModule } from '@angular/cdk/overlay';
import { Component, computed, inject } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroXMarkMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../data-access/toast.service';

@Component({
  selector: 'rp-toast',
  standalone: true,
  imports: [OverlayModule, TranslateModule, NgIconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  private readonly _toastService = inject(ToastService);

  protected readonly heroXMarkMini = heroXMarkMini;

  protected readonly toast = this._toastService.toast;

  protected readonly colors = computed(() => {
    switch (this.toast()?.type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-100';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-600 dark:text-red-100';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-100';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-100';
      default:
        return 'bg-neutral-50 border-neutral-500 text-neutral-800 dark:bg-neutral-900 dark:border-neutral-600 dark:text-neutral-100';
    }
  });

  public closeToast(): void {
    this._toastService.hideToast();
  }
}
