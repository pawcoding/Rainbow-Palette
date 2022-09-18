import {Meta, Story} from "@storybook/angular";
import {LightSwitchComponent} from "./light-switch.component";
import {StorageService} from "../../services/storage.service";

export default {
  title: 'Components/Light Switch',
  component: LightSwitchComponent,
} as Meta

class MockStorageService implements Partial<StorageService> {

  toggleTheme(dark: boolean | undefined) {
    console.log(`toggleTheme(${dark === undefined ? 'toggle' : (dark ? 'dark' : 'light')})`)
    return dark || false
  }

}

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [{
      provide: StorageService,
      useClass: MockStorageService
    }]
  }
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
