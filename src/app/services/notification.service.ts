import { EventEmitter, Injectable, Signal, signal } from '@angular/core'
import { Dialog } from '../interfaces/dialog.interface'
import { Notification } from '../types/notification.type'
import { sleep, wake } from '../utils/sleep.util'

const NOTIFICATION_TIMEOUT = 'NOTIFICATION'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  dialog: EventEmitter<Dialog | undefined> = new EventEmitter<
    Dialog | undefined
  >()

  private _notification = signal<Notification>(undefined)

  /**
   * Open a notification
   * @param notification
   */
  public async openNotification(
    notification: Notification,
    duration = 5000
  ): Promise<void> {
    if (notification) {
      this._notification.set(notification)
      await sleep(duration, NOTIFICATION_TIMEOUT)
      this.closeNotification()
    } else {
      this.closeNotification()
    }
  }

  /**
   * Close the current notification
   */
  public closeNotification(): void {
    this._notification.set(undefined)
    wake(NOTIFICATION_TIMEOUT)
  }

  /**
   * Readonly notification signal
   */
  public get notification(): Signal<Notification> {
    return this._notification.asReadonly()
  }
}
