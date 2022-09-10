import {ColorEditorComponent} from "./color-editor.component";
import {Meta, Story} from "@storybook/angular";

export default {
  title: 'Components/Color Editor',
  component: ColorEditorComponent
} as Meta

const Template: Story = (args) => ({
  props: args
})

export const Primary = Template.bind({})

Primary.args = {
  dark: false
}
