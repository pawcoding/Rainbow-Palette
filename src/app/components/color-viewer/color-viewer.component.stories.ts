import { ColorViewerComponent } from './color-viewer.component'
import { Meta, Story } from '@storybook/angular'
import { Color } from '../../models/color.model'
import { ColorService } from '../../services/color.service'
import { NotificationService } from '../../services/notification.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { PaletteService } from '../../services/palette.service'
import { ColorServiceMock } from '../../mocks/color.service.mock'
import { PaletteServiceMock } from '../../mocks/palette.service.mock'

export default {
  title: 'Components/Color',
  component: ColorViewerComponent,
} as Meta

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [
      {
        provide: ColorService,
        useClass: ColorServiceMock,
      },
      NotificationService,
      {
        provide: PaletteService,
        useClass: PaletteServiceMock,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const PawcodeBlue = Template.bind({})

PawcodeBlue.args = {
  dark: false,
  color: new Color('pawcode Blue', '#4472c4'),
}
