import {Component, Input, OnInit} from '@angular/core';
import { NotificationService} from "../../services/notification.service";
import {Notification} from "../../notifications/notification.interface";

@Component({
  selector: 'custom-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {

  @Input()
  dark = false

  notification: Notification | undefined

  constructor(
    private notificationService: NotificationService
  ) {
    notificationService.notification
      .subscribe(notification => this.notification = notification)
  }

  ngOnInit(): void {
  }

  closeNotification() {
    this.notificationService.notification.emit(undefined)
  }

}
