import {PaletteViewerComponent} from "./palette-viewer.component";
import {Meta, Story, moduleMetadata} from "@storybook/angular";
import {Palette} from "../../models/palette.model";
import {ColorViewerComponent} from "../color-viewer/color-viewer.component";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {Color} from "../../models/color.model";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";
import {EventEmitter} from "@angular/core";
import {Notification} from "../../notifications/notification.interface";

export default {
  title: 'Components/Palette',
  component: PaletteViewerComponent,
  subcomponents: {ColorViewerComponent},
  decorators: [
    moduleMetadata({
      declarations: [ColorViewerComponent]
    })
  ]
} as Meta

class MockStorageService implements Partial<StorageService> {

  savePalette(palette: Palette) {
    console.log(`savePalette(${palette.title})`)
  }

}

class MockNotificationService implements Partial<NotificationService> {

  dialog: EventEmitter<Notification | undefined> = new EventEmitter<Notification | undefined>()

  notification: EventEmitter<Notification | undefined> = new EventEmitter<Notification | undefined>()

  constructor() {
    this.dialog.subscribe(dialogContent => {
      if (dialogContent) {
        console.log('Show dialog\n', dialogContent.message)
      } else {
        console.log('Close dialog')
      }
    })

    this.notification.subscribe(notificationContent => {
      if (notificationContent) {
        console.log('Show notification\n', notificationContent.message)
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
      provide: StorageService,
      useClass: MockStorageService
    }, {
      provide: NotificationService,
      useClass: MockNotificationService
    }]
  }
})


export const Rainbow = Template.bind({})

const rainbowPalette = new Palette('Rainbow', uuidv4())
rainbowPalette.addColor(new Color('Slate', '#64748b'))
rainbowPalette.addColor(new Color('Gray', '#6b7280'))
rainbowPalette.addColor(new Color('Zinc', '#71717a'))
rainbowPalette.addColor(new Color('Neutral', '#737373'))
rainbowPalette.addColor(new Color('Stone', '#78716c'))
rainbowPalette.addColor(new Color('Red', '#ef4444'))
rainbowPalette.addColor(new Color('Orange', '#f97316'))
rainbowPalette.addColor(new Color('Amber', '#f59c0b'))
rainbowPalette.addColor(new Color('Yellow', '#eab308'))
rainbowPalette.addColor(new Color('Lime', '#84cc16'))
rainbowPalette.addColor(new Color('Green', '#22c55e'))
rainbowPalette.addColor(new Color('Emerald', '#10b981'))
rainbowPalette.addColor(new Color('Teal', '#14b8a6'))
rainbowPalette.addColor(new Color('Cyan', '#06b6d4'))
rainbowPalette.addColor(new Color('Sky', '#0ea5e9'))
rainbowPalette.addColor(new Color('Blue', '#3b82f6'))
rainbowPalette.addColor(new Color('Indigo', '#6366f1'))
rainbowPalette.addColor(new Color('Violet', '#8b5cf6'))
rainbowPalette.addColor(new Color('Purple', '#a855f7'))
rainbowPalette.addColor(new Color('Fuchsia', '#d946ef'))
rainbowPalette.addColor(new Color('Pink', '#ec4899'))
rainbowPalette.addColor(new Color('Rose', '#f43f5e'))

Rainbow.args = {
  dark: false,
  palette: rainbowPalette
}


export const Pawcode = Template.bind({})

const pawcodePalette = new Palette('pawcode', uuidv4())
pawcodePalette.addColor(new Color('Blue', '#4472c4'))
pawcodePalette.addColor(new Color('Gray', '#262626'))

Pawcode.args = {
  dark: false,
  palette: pawcodePalette
}


export const MediaScope = Template.bind({})

const mediaScopePalette = new Palette('media-scope', uuidv4())
mediaScopePalette.addColor(new Color('Blue', '#2faafa'))
mediaScopePalette.addColor(new Color('Orange', '#f79e36'))
mediaScopePalette.addColor(new Color('Red', '#bb2b47'))
mediaScopePalette.addColor(new Color('Gray', '#444444'))

MediaScope.args = {
  dark: false,
  palette: mediaScopePalette
}


export const Random = Template.bind({})

Random.args = {
  dark: false,
  palette: Palette.generateRandomPalette(5)
}
