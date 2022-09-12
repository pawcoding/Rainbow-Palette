import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../../notifications/notification.interface";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {

  @Input()
  dark = false

  content: Notification | undefined

  timeout: number | undefined

  constructor(
    private notificationService: NotificationService
  ) {
    notificationService.notification
      .subscribe(notificationContent => {
        this.content = notificationContent
        if (notificationContent) {
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

  ngOnInit(): void {
  }

  closeNotification() {
    this.notificationService.notification.emit(undefined)
  }

}
