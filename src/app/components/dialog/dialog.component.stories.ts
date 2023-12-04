import { DialogComponent } from './dialog.component'
import { applicationConfig, Meta, Story } from '@storybook/angular'
import { StorybookTranslateModule } from '../../utils/storybook-translate.module'
import { matomoProvidersMock } from '../../mocks/matomo.providers.mock'
import { DialogService } from '../../services/dialog.service'
import { dialogServiceMockFactory } from '../../mocks/dialog.service.mock'
import { IconsModule } from '../../icons.module'

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
    imports: [StorybookTranslateModule, IconsModule],
    providers: [
      { provide: DialogService, useFactory: dialogServiceMockFactory(false) },
    ],
  },
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
Primary.parameters = {
  layout: 'fullscreen',
}

const ExportTemplate: Story = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [StorybookTranslateModule, IconsModule],
    providers: [
      { provide: DialogService, useFactory: dialogServiceMockFactory(true) },
    ],
  },
})

export const ExportDialog = ExportTemplate.bind({})

ExportDialog.args = {
  dark: false,
}
ExportDialog.parameters = {
  layout: 'fullscreen',
}
