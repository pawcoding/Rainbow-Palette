import { Component, Input } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { Dialog } from '../../interfaces/dialog.interface'
import { MatomoTracker } from 'ngx-matomo-client'

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input()
  dark = false

  dialog: Dialog | undefined

  constructor(
    private notificationService: NotificationService,
    private tracker: MatomoTracker
  ) {
    notificationService.dialog.subscribe((dialog) => {
      this.dialog = dialog

      if (this.dialog) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }

      if (dialog && /export-(css|tailwind)-(copy|file)/.test(dialog.id)) {
        const [category, action, name] = dialog.id.split('-')
        this.tracker.trackEvent(category, action, name)
      }
    })
  }

  protected getWidth(): string {
    switch (this.dialog?.style?.width) {
      case 'small':
        return 'max-w-md'
      case 'large':
        return 'max-w-2xl'
      default:
        return 'max-w-lg'
    }
  }

  protected getAlign(): string {
    switch (this.dialog?.style?.align) {
      case 'justify':
        return 'text-justify'
      case 'right':
        return 'text-right'
      case 'left':
        return 'text-left'
      default:
        return 'text-center'
    }
  }

  protected closeNotification(): void {
    this.notificationService.dialog.emit(undefined)
  }

  protected async triggerCallback(actionId: string): Promise<void> {
    const action = this.dialog?.actions?.find(
      (action) => action.id === actionId
    )

    if (action?.callback) {
      this.notificationService.dialog.emit(await action.callback())
    } else {
      this.closeNotification()
    }
  }
}
