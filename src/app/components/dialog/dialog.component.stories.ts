import {DialogComponent} from "./dialog.component";
import {Meta, Story} from "@storybook/angular";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";
import {Dialog} from "../../interfaces/dialog.interface";

export default {
  title: 'Components/Dialog',
  component: DialogComponent
} as Meta

class MockNotificationService implements Partial<NotificationService> {

  dialog = new EventEmitter<Dialog | undefined>()

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
      this.dialog.emit(undefined)
      setTimeout(() => {
        this.dialog.emit(content)
      }, 2000)
    })
    next.subscribe(() => {
      this.dialog.emit(content)
    })

    setTimeout(() => {
      this.dialog.emit(content)
    }, 0)

    this.dialog.subscribe(notification => {
      if (notification)
        console.log('Show dialog\n', notification.message)
      else
        console.log('Close dialog')
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
