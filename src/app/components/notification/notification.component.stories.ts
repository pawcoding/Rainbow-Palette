import {NotificationComponent} from "./notification.component";
import {Meta, Story} from "@storybook/angular";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";

export default {
  title: 'Components/Notification',
  component: NotificationComponent
} as Meta

class MockNotificationService implements Partial<NotificationService> {

  notification = new EventEmitter<string | undefined>()

  constructor() {
    const message = 'This is short notification.'

    setTimeout(() => {
      this.notification.emit(message)
    }, 0)

    this.notification.subscribe(nextMessage => {
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
