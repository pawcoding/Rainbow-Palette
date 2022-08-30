import {PaletteViewerComponent} from "./palette-viewer.component";
import {Meta, Story, moduleMetadata} from "@storybook/angular";
import {Palette} from "../../models/palette.model";
import {ColorViewerComponent} from "../color-viewer/color-viewer.component";

export default {
  title: 'Components/Palette',
  component: PaletteViewerComponent,
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


export const Rainbow = Template.bind({})

const rainbowPalette = new Palette('Rainbow')
rainbowPalette.addColor('Slate', '#64748b')
rainbowPalette.addColor('Gray', '#6b7280')
rainbowPalette.addColor('Zinc', '#71717a')
rainbowPalette.addColor('Neutral', '#737373')
rainbowPalette.addColor('Stone', '#78716c')
rainbowPalette.addColor('Red', '#ef4444')
rainbowPalette.addColor('Orange', '#f97316')
rainbowPalette.addColor('Amber', '#f59c0b')
rainbowPalette.addColor('Yellow', '#eab308')
rainbowPalette.addColor('Lime', '#84cc16')
rainbowPalette.addColor('Green', '#22c55e')
rainbowPalette.addColor('Emerald', '#10b981')
rainbowPalette.addColor('Teal', '#14b8a6')
rainbowPalette.addColor('Cyan', '#06b6d4')
rainbowPalette.addColor('Sky', '#0ea5e9')
rainbowPalette.addColor('Blue', '#3b82f6')
rainbowPalette.addColor('Indigo', '#6366f1')
rainbowPalette.addColor('Violet', '#8b5cf6')
rainbowPalette.addColor('Purple', '#a855f7')
rainbowPalette.addColor('Fuchsia', '#d946ef')
rainbowPalette.addColor('Pink', '#ec4899')
rainbowPalette.addColor('Rose', '#f43f5e')

Rainbow.args = {
  dark: false,
  palette: rainbowPalette
}


export const Pawcode = Template.bind({})

const pawcodePalette = new Palette('pawcode')
pawcodePalette.addColor('Blue', '#4472c4')
pawcodePalette.addColor('Gray', '#262626')

Pawcode.args = {
  dark: false,
  palette: pawcodePalette
}


export const MediaScope = Template.bind({})

const mediaScopePalette = new Palette('media-scope')
mediaScopePalette.addColor('Blue', '#2faafa')
mediaScopePalette.addColor('Orange', '#f79e36')
mediaScopePalette.addColor('Red', '#bb2b47')
mediaScopePalette.addColor('Gray', '#444444')

MediaScope.args = {
  dark: false,
  palette: mediaScopePalette
}
