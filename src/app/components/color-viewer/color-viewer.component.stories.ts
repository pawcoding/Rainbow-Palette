import {ColorViewerComponent} from "./color-viewer.component";
import {Meta, Story} from "@storybook/angular";
import {Color} from "../../models/color.model";
import {ColorService} from "../../services/color.service";

export default {
  title: 'Components/Color',
  component: ColorViewerComponent
} as Meta

class MockColorService implements Partial<ColorService> {

  loadColor(color: Color) {
    console.log(`loadColor(${color.name})`)
  }

}

const Template: Story = (args) => ({
  props: args,
  moduleMetadata: {
    providers: [{
      provide: ColorService,
      useClass: MockColorService
    }]
  }
})

export const PawcodeBlue = Template.bind({})

PawcodeBlue.args = {
  dark: false,
  color: new Color('pawcode Blue', '#4472c4')
}
