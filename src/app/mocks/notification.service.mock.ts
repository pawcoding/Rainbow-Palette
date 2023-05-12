import { NotificationService } from '../services/notification.service'
import { EventEmitter } from '@angular/core'
import { Dialog } from '../interfaces/dialog.interface'

export class NotificationServiceMock implements Partial<NotificationService> {
  notification = new EventEmitter<
    | string
    | { id: string; interpolateParams: { [key: string]: string } }
    | undefined
  >()

  dialog = new EventEmitter<Dialog | undefined>()

  constructor() {
    this.initNotification()
    this.initDialog()
  }

  initNotification() {
    const message = 'test'

    setTimeout(() => {
      this.notification.emit(message)
    }, 0)

    this.notification.subscribe((nextMessage) => {
      if (nextMessage) {
        console.log('Show Notification\n', nextMessage)
      } else {
        console.log('Close Notification')
        setTimeout(() => {
          this.notification.emit(message)
        }, 1000)
      }
    })
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
