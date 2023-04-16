import { ColorEditorComponent } from './color-editor.component'
import { Meta, Story } from '@storybook/angular'
import { ColorService } from '../../services/color.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { ColorServiceMock } from '../../mocks/color.service.mock'

export default {
  title: 'Components/Color Editor',
  component: ColorEditorComponent,
} as Meta

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [
      {
        provide: ColorService,
        useClass: ColorServiceMock,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
