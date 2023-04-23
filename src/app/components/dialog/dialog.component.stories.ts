import { DialogComponent } from './dialog.component'
import { applicationConfig, Meta, Story } from '@storybook/angular'
import { NotificationService } from '../../services/notification.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { matomoProvidersMock } from '../../mocks/matomo.providers.mock'
import { NotificationServiceMock } from '../../mocks/notification.service.mock'

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
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
        provide: NotificationService,
        useClass: NotificationServiceMock,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}

Primary.parameters = {
  layout: 'fullscreen',
}
