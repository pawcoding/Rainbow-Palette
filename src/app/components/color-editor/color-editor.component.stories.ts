import {ColorEditorComponent} from "./color-editor.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ColorViewerComponent} from "../color-viewer/color-viewer.component";
import {Color} from "../../models/color.model";

export default {
  title: 'Components/Color Editor',
  component: ColorEditorComponent,
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
  color: Color.generateRandomColor()
}
