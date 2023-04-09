import { ColorEditorComponent } from './color-editor.component'
import { Meta, Story } from '@storybook/angular'
import { ChangeType, ColorService } from '../../services/color.service'
import { NotificationService } from '../../services/notification.service'
import { EventEmitter } from '@angular/core'
import { Color } from '../../models/color.model'
import { Shade } from '../../models/shade.model'
import { ColorInterpolater } from '../../class/color-interpolater'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'

export default {
  title: 'Components/Color Editor',
  component: ColorEditorComponent,
} as Meta

class MockColorService implements Partial<ColorService> {
  private color: Color | undefined
  private shade: Shade | undefined
  private colorChangeEmitter: EventEmitter<ChangeType> =
    new EventEmitter<ChangeType>()

  constructor() {
    setTimeout(() => {
      this.loadColor(Color.generateRandomColor())
    }, 0)
  }

  loadColor(color: Color, shadeIndex?: number) {
    this.color = Color.parseColor(color)
    if (shadeIndex) this.shade = this.color.getShade(shadeIndex)
    else this.shade = this.color.shades.find((s) => s.fixed)
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  closeEditor() {
    this.color = undefined
    this.shade = undefined
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  adjustShades() {
    if (this.color) {
      ColorInterpolater.regenerateShades(this.color)
      this.colorChangeEmitter.emit(ChangeType.ADJUST)
    }
  }

  saveColor() {
    if (this.color) {
      console.info('Saving color')
      this.closeEditor()
    }
  }

  getColor() {
    return this.color
  }

  getShade() {
    return this.shade
  }

  getColorChangeEmitter() {
    return this.colorChangeEmitter
  }
}

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [
      {
        provide: ColorService,
        useClass: MockColorService,
      },
      {
        provide: NotificationService,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
