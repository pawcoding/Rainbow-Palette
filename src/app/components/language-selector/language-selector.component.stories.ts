import { LanguageSelectorComponent } from './language-selector.component'
import { applicationConfig, Meta, Story } from '@storybook/angular'
import { StorageService } from '../../services/storage.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { StorageServiceMock } from '../../mocks/storage.service.mock'
import { matomoProvidersMock } from '../../mocks/matomo.providers.mock'

export default {
  title: 'Components/Language Selector',
  component: LanguageSelectorComponent,
  decorators: [
    applicationConfig({
      providers: [...matomoProvidersMock],
    }),
  ],
} as Meta

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [
      {
        provide: StorageService,
        useClass: StorageServiceMock,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
