import {NotificationComponent} from "./notification.component";
import {Meta, Story} from "@storybook/angular";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";
import {Notification} from "../../notifications/notification.interface";

export default {
  title: 'Components/Notification',
  component: NotificationComponent
} as Meta

class MockNotificationService implements Partial<NotificationService> {

  notification = new EventEmitter<Notification | undefined>()

  constructor() {
    let content = {
      message: 'This is short notification.',
      actions: []
    }

    setTimeout(() => {
      this.notification.emit(content)
    }, 0)

    this.notification.subscribe(notification => {
      if (notification) {
        console.log('Show Notification\n', notification.message)
      } else {
        console.log('Close Notification')
        setTimeout(() => {
          this.notification.emit(content)
        }, 1000)
      }
    })
  }
}

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [{
      provide: NotificationService,
      useClass: MockNotificationService
    }]
  }
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false
}
