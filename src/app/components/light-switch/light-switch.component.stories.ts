import {Meta, Story} from "@storybook/angular";
import {LightSwitchComponent} from "./light-switch.component";

export default {
  title: 'Components/Light Switch',
  component: LightSwitchComponent,
} as Meta

const Template: Story = (args) => ({
  props: args
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false,
}
