import { LanguageSelectorComponent } from './language-selector.component'
import { Meta, Story } from '@storybook/angular'
import { StorageService } from '../../services/storage.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'

export default {
  title: 'Components/Language Selector',
  component: LanguageSelectorComponent,
} as Meta

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [
      {
        provide: StorageService,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
