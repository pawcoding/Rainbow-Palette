import {Component, Input, OnInit} from '@angular/core';
import { NotificationService} from "../../services/notification.service";
import {Dialog} from "../../interfaces/dialog.interface";

@Component({
  selector: 'custom-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {

  @Input()
  dark = false

  content: Dialog | undefined

  constructor(
    private notificationService: NotificationService
  ) {
    notificationService.dialog
      .subscribe(dialogContent => this.content = dialogContent)
  }

  ngOnInit(): void {
  }

  closeNotification() {
    this.notificationService.dialog.emit(undefined)
  }

}
