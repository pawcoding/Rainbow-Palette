import { EventEmitter, Injectable } from '@angular/core'
import { Dialog } from '../interfaces/dialog.interface'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  dialog: EventEmitter<Dialog | undefined> = new EventEmitter<
    Dialog | undefined
  >()

  notification: EventEmitter<
    | string
    | { id: string; interpolateParams: { [key: string]: string } }
    | undefined
  > = new EventEmitter<
    | string
    | { id: string; interpolateParams: { [key: string]: string } }
    | undefined
  >()
}
