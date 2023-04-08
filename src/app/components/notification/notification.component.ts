import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {

  @Input()
  dark = false

  message: string | undefined
  complexNotification: { id: string, interpolateParams: Object } | undefined
  timeout: number | undefined

  constructor(
    private notificationService: NotificationService
  ) {
    notificationService.notification
      .subscribe(notification => {
        if (typeof notification === 'string') {
          this.message = notification
          this.complexNotification = undefined
        } else {
          this.complexNotification = notification
          this.message = undefined
        }

        if (notification) {
          clearTimeout(this.timeout)
          // @ts-ignore
          this.timeout = setTimeout(() => {
            this.closeNotification()
          }, 5000)
        } else {
          clearTimeout(this.timeout)
          this.timeout = undefined
        }
      })
  }

  ngOnInit(): void {
  }

  closeNotification() {
    this.notificationService.notification.emit(undefined)
  }

}
