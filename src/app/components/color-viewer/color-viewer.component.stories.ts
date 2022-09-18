import {ColorViewerComponent} from "./color-viewer.component";
import {Meta, Story} from "@storybook/angular";
import {Color} from "../../models/color.model";
import {ColorService} from "../../services/color.service";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";

export default {
  title: 'Components/Color',
  component: ColorViewerComponent
} as Meta

class MockColorService implements Partial<ColorService> {

  loadColor(color: Color) {
    console.log(`loadColor(${color.name})`)
  }

}

class MockNotificationService implements Partial<NotificationService> {

  notification: EventEmitter<string | undefined> = new EventEmitter<string | undefined>()

  constructor() {
    this.notification.subscribe(message => {
      if (message) {
        console.log('Show notification\n', message)
      } else {
        console.log('Close notification')
      }
    })
  }

}

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [{
      provide: ColorService,
      useClass: MockColorService
    }, {
      provide: NotificationService,
      useClass: MockNotificationService
    }]
  }
})

export const PawcodeBlue = Template.bind({})

PawcodeBlue.args = {
  dark: false,
  color: new Color('pawcode Blue', '#4472c4')
}
