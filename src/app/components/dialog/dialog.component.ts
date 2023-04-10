import { Component, Input } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { Dialog } from '../../interfaces/dialog.interface'
import { MatomoTracker } from '@ngx-matomo/tracker'

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input()
  dark = false

  content: Dialog | undefined

  constructor(
    private notificationService: NotificationService,
    private tracker: MatomoTracker
  ) {
    notificationService.dialog.subscribe((dialogContent) => {
      this.content = dialogContent

      if (dialogContent) this.tracker.trackEvent('dialog', dialogContent?.id)
    })
  }

  closeNotification() {
    this.notificationService.dialog.emit(undefined)
  }
}
