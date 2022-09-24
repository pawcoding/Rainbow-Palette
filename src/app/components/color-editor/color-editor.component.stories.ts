import {ColorEditorComponent} from "./color-editor.component";
import {Meta, Story} from "@storybook/angular";
import {ColorService} from "../../services/color.service";
import {Color} from "../../models/color.model";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";

export default {
  title: 'Components/Color Editor',
  component: ColorEditorComponent
} as Meta

class MockColorService implements Partial<ColorService> {

  private colorService: ColorService = new ColorService()

  getColor() {
    console.log('getColor()')
    return this.colorService.getColor()
  }

  getColorChangeEmitter() {
    console.log('getColorChangeEmitter()')
    return this.colorService.getColorChangeEmitter()
  }

  adjustColor(color: Color) {
    console.log(`adjustColor(${color.name})`)
    return this.colorService.adjustShade()
  }

  updateColorName(name: string) {
    console.log(`updateColorName(${name})`)
    return this.colorService.updateColorName(name)
  }

  randomColor() {
    console.log('randomColor()')
    return this.colorService.randomColor()
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
      provide: ColorService
    }, {
      provide: NotificationService,
      useClass: MockNotificationService
    }]
  }
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false
}
