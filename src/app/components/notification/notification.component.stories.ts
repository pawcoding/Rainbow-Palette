import { NotificationComponent } from './notification.component'
import { Meta, Story } from '@storybook/angular'
import { NotificationService } from '../../services/notification.service'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { NotificationServiceMock } from '../../mocks/notification.service.mock'
import { IconsModule } from '../../icons.module'

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
    imports: [StorybookTranslateModule, IconsModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
