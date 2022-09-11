import {DialogComponent} from "./dialog.component";
import {Meta, Story} from "@storybook/angular";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";
import {Notification} from "../../notifications/notification.interface";

export default {
  title: 'Components/Dialog',
  component: DialogComponent
} as Meta

class MockNotificationService implements Partial<NotificationService> {
  notification = new EventEmitter<Notification | undefined>()

  constructor() {
    const wait = new EventEmitter()
    const next = new EventEmitter()

    let content = {
      message: 'This is a test message for storybook.\n\n' +
        'You can use \\n to create new lines in here.',
      actions: [{
        text: 'Wait',
        title: 'Wait 2 seconds for next dialog',
        action: wait
      }, {
        text: 'Next',
        title: 'Show next dialog',
        action: next
      }]
    }

    wait.subscribe(() => {
      this.notification.emit(undefined)
      setTimeout(() => {
        this.notification.emit(content)
      }, 2000)
    })
    next.subscribe(() => {
      this.notification.emit(content)
    })

    setTimeout(() => {
      this.notification.emit(content)
    }, 0)

    this.notification.subscribe(n => {
      console.log(n)
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
