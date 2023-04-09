import { Component, Input } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { Dialog } from '../../interfaces/dialog.interface'

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Input()
  dark = false

  content: Dialog | undefined

  constructor(private notificationService: NotificationService) {
    notificationService.dialog.subscribe(
      (dialogContent) => (this.content = dialogContent)
    )
  }

  closeNotification() {
    this.notificationService.dialog.emit(undefined)
  }
}
