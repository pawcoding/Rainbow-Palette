import { Component, Input, computed, inject } from '@angular/core'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  @Input()
  dark = false

  private readonly notificationService = inject(NotificationService)

  protected readonly message = computed(() => {
    const notification = this.notificationService.notification()
    if (typeof notification === 'string') return notification
    else return undefined
  })

  protected readonly complexNotification = computed(() => {
    const notification = this.notificationService.notification()
    if (typeof notification === 'string') return undefined
    else return notification
  })

  closeNotification() {
    this.notificationService.closeNotification()
  }
}
