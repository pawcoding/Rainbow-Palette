import {ShadePickerComponent} from "./shade-picker.component";
import {Meta, Story} from "@storybook/angular";
import {Shade} from "../../models/shade.model";

export default {
  title: 'Components/Shade Picker',
  component: ShadePickerComponent,
} as Meta

const Template: Story = (args) => ({
  props: args
})

export const PawcodeBlue = Template.bind({})

PawcodeBlue.args = {
  dark: false,
  shade: new Shade(0, '#4472c4'),
  name: 'pawcode Blue'
}
