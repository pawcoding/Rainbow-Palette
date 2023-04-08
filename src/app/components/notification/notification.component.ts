import { Component, Input } from '@angular/core'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  @Input()
  dark = false

  message: string | undefined
  complexNotification:
    | { id: string; interpolateParams: { [key: string]: string } }
    | undefined
  timeout: number | undefined

  constructor(private notificationService: NotificationService) {
    notificationService.notification.subscribe((notification) => {
      if (typeof notification === 'string') {
        this.message = notification
        this.complexNotification = undefined
      } else {
        this.complexNotification = notification
        this.message = undefined
      }

      if (notification) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.closeNotification()
        }, 5000)
      } else {
        clearTimeout(this.timeout)
        this.timeout = undefined
      }
    })
  }

  closeNotification() {
    this.notificationService.notification.emit(undefined)
  }
}
