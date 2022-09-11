import {Component, OnInit} from '@angular/core';
import { NotificationService} from "../../services/notification.service";
import {Notification} from "../../notifications/notification.interface";

@Component({
  selector: 'export-dialog',
  templateUrl: './export-dialog.component.html',
})
export class ExportDialogComponent implements OnInit {

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
