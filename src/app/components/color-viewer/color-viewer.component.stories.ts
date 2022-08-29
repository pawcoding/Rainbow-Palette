import {ColorViewerComponent} from "./color-viewer.component";
import {Meta, Story} from "@storybook/angular";
import {Color} from "../../models/color.model";

export default {
  title: 'Components/Color',
  component: ColorViewerComponent
} as Meta

const Template: Story = (args) => ({
  props: args
})

export const PawcodeBlue = Template.bind({})

PawcodeBlue.args = {
  dark: false,
  color: new Color('pawcode Blue', '#4472c4')
}
