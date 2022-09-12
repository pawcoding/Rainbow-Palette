import {EventEmitter, Injectable} from '@angular/core';
import {Notification} from "../notifications/notification.interface";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  dialog: EventEmitter<Notification | undefined> = new EventEmitter<Notification | undefined>()

  notification: EventEmitter<Notification | undefined> = new EventEmitter<Notification | undefined>()

  constructor() { }

}
