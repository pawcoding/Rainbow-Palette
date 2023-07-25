import { NotificationService } from '../services/notification.service'
import { Signal, signal } from '@angular/core'
import { Notification } from '../types/notification.type'

export class NotificationServiceMock implements Partial<NotificationService> {
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
    return signal<Notification>('test').asReadonly()
  }
}
