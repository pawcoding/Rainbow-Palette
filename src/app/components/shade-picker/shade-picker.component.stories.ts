import {ShadePickerComponent} from "./shade-picker.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ColorViewerComponent} from "../color-viewer/color-viewer.component";
import {Shade} from "../../models/shade.model";

export default {
  title: 'Components/Shade Picker',
  component: ShadePickerComponent,
  subcomponents: {ColorViewerComponent},
  decorators: [
    moduleMetadata({
      declarations: [ColorViewerComponent]
    })
  ]
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
