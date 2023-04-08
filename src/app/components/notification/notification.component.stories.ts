import {NotificationComponent} from "./notification.component";
import {Meta, Story} from "@storybook/angular";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";
import {StorybookTranslateModule} from "../../utils/storybook-translate.module";

export default {
  title: 'Components/Notification',
  component: NotificationComponent
} as Meta

class MockNotificationService implements Partial<NotificationService> {

  notification = new EventEmitter<string | { id: string, interpolateParams: Object } | undefined>()

  constructor() {
    const message = 'test'

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
    }],
    imports: [
      StorybookTranslateModule,
    ]
  }
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false
}
