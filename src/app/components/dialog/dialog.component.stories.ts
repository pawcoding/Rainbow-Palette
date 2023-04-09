import { DialogComponent } from './dialog.component'
import { Meta, Story } from '@storybook/angular'
import { NotificationService } from '../../services/notification.service'
import { EventEmitter } from '@angular/core'
import { Dialog } from '../../interfaces/dialog.interface'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'

export default {
  title: 'Components/Dialog',
  component: DialogComponent,
} as Meta

class MockNotificationService implements Partial<NotificationService> {
  dialog = new EventEmitter<Dialog | undefined>()

  constructor() {
    const wait = new EventEmitter()
    const next = new EventEmitter()

    const content: Dialog = {
      id: 'test',
      actions: [
        {
          id: 'wait',
          action: wait,
        },
        {
          id: 'next',
          action: next,
        },
      ],
    }

    wait.subscribe(() => {
      this.dialog.emit(undefined)
      setTimeout(() => {
        this.dialog.emit(content)
      }, 2000)
    })
    next.subscribe(() => {
      this.dialog.emit(content)
    })

    setTimeout(() => {
      this.dialog.emit(content)
    }, 0)

    this.dialog.subscribe((notification) => {
      if (notification) console.log('Show dialog\n', notification.id)
      else console.log('Close dialog')
    })
  }
}

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [
      {
        provide: NotificationService,
        useClass: MockNotificationService,
      },
    ],
    imports: [StorybookTranslateModule],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
