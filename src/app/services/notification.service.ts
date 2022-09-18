import {EventEmitter, Injectable} from '@angular/core';
import {Dialog} from "../interfaces/dialog.interface";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  dialog: EventEmitter<Dialog | undefined> = new EventEmitter<Dialog | undefined>()

  notification: EventEmitter<string | undefined> = new EventEmitter<string | undefined>()

  constructor() { }

}
