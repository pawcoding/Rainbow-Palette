import { NotificationComponent } from './notification.component'
import { Meta, Story } from '@storybook/angular'
import { NotificationService } from '../../services/notification.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { NotificationServiceMock } from '../../mocks/notification.service.mock'

export default {
  title: 'Components/Notification',
  component: NotificationComponent,
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
