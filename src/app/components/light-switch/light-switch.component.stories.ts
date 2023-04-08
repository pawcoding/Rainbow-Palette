import {Meta, Story} from "@storybook/angular";
import {LightSwitchComponent} from "./light-switch.component";
import {StorageService} from "../../services/storage.service";
import {StorybookTranslateModule} from "../../utils/storybook-translate.module";

export default {
  title: 'Components/Light Switch',
  component: LightSwitchComponent,
} as Meta

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [{
      provide: StorageService
    }],
    imports: [
      StorybookTranslateModule
    ]
  }
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
