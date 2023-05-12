import { NotificationService } from '../services/notification.service'
import { EventEmitter, Signal, signal } from '@angular/core'
import { Dialog } from '../interfaces/dialog.interface'
import { Notification } from '../types/notification.type'

export class NotificationServiceMock implements Partial<NotificationService> {
  private _notification = signal<Notification>('test')

  public async openNotification(
    notification: Notification,
    duration?: number
  ): Promise<void> {
    console.log(
      `NotificationService.openNotification(${notification}, ${duration})`
    )
  }

  public closeNotification(): void {
    console.log('NotificationService.closeNotification()')
  }

  public get notification(): Signal<Notification> {
    console.log('NotificationService.notification')
    return this._notification.asReadonly()
  }

  dialog = new EventEmitter<Dialog | undefined>()

  constructor() {
    this.initDialog()
  }

  initDialog() {
    const content: Dialog = {
      id: 'test',
      actions: [
        {
          id: 'wait',
        },
        {
          id: 'next',
          callback: async () => {
            return content
          },
        },
      ],
    }

    setTimeout(() => {
      this.dialog.emit(content)
    }, 0)

    this.dialog.subscribe((notification) => {
      if (notification) {
        console.log('Show dialog\n', notification.id)
      } else {
        console.log('Close dialog')
        setTimeout(() => {
          this.dialog.emit(content)
        }, 2000)
      }
    })
  }
}
