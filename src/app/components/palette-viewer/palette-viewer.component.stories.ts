import {PaletteViewerComponent} from "./palette-viewer.component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {Palette} from "../../models/palette.model";
import {ColorViewerComponent} from "../color-viewer/color-viewer.component";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {Color} from "../../models/color.model";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";
import {PaletteGenerator, PaletteScheme} from "../../class/palette-generator";

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
  props: args,
  moduleMetadata: {
    providers: [{
      provide: StorageService
    }, {
      provide: NotificationService
    }]
  }
})


export const Tailwind = Template.bind({})

const tailwindPalette = new Palette('Tailwind', uuidv4())
tailwindPalette.addColor(new Color('Slate', ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a']))
tailwindPalette.addColor(new Color('Gray', ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827']))
tailwindPalette.addColor(new Color('Zinc', ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b']))
tailwindPalette.addColor(new Color('Neutral', ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717']))
tailwindPalette.addColor(new Color('Stone', ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917']))
tailwindPalette.addColor(new Color('Red', ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d']))
tailwindPalette.addColor(new Color('Orange', ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12']))
tailwindPalette.addColor(new Color('Amber', ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f']))
tailwindPalette.addColor(new Color('Yellow', ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12']))
tailwindPalette.addColor(new Color('Lime', ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314']))
tailwindPalette.addColor(new Color('Green', ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d']))
tailwindPalette.addColor(new Color('Emerald', ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b']))
tailwindPalette.addColor(new Color('Teal', ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a']))
tailwindPalette.addColor(new Color('Cyan', ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63']))
tailwindPalette.addColor(new Color('Sky', ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e']))
tailwindPalette.addColor(new Color('Blue', ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a']))
tailwindPalette.addColor(new Color('Indigo', ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81']))
tailwindPalette.addColor(new Color('Violet', ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95']))
tailwindPalette.addColor(new Color('Purple', ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87']))
tailwindPalette.addColor(new Color('Fuchsia', ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75']))
tailwindPalette.addColor(new Color('Pink', ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843']))
tailwindPalette.addColor(new Color('Rose', ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337']))

Tailwind.args = {
  dark: false,
  palette: tailwindPalette
}


export const Pawcode = Template.bind({})

const pawcodePalette = new Palette('pawcode', uuidv4())
pawcodePalette.addColor(new Color('Blue', ['#edf1f9', '#dae3f3', '#b5c7e7', '#8fabdb', '#6a8ed0', '#4472c4', '#365b9d', '#294476', '#1c2e4f', '#0e1727']))
pawcodePalette.addColor(new Color('Gray', ['#eeeeee', '#dcdcdc', '#bababa', '#999999', '#777777', '#555555', '#444444', '#333333', '#222222', '#111111']))

Pawcode.args = {
  dark: false,
  palette: pawcodePalette
}


export const MediaScope = Template.bind({})

const mediaScopePalette = new Palette('media-scope', uuidv4())
mediaScopePalette.addColor(new Color('Blue', ['#eff8fe', '#dff1fc', '#bfe4e9', '#9fd7f6', '#77bde9', '#4ea3db', '#4385c5', '#3967af', '#2e4998', '#17254c']))
mediaScopePalette.addColor(new Color('Red', ['#fbe0e5', '#f7c1cb', '#f08498', '#e94765', '#da3e5b', '#cb3552', '#bc2c48', '#a2213e', '#871534', '#440b1a']))
mediaScopePalette.addColor(new Color('Yellow', ['#fff3db', '#fee7b7', '#fdd06f', '#fbb827', '#f8ab30', '#f59e39', '#d87d2d', '#bc5d22', '#9f3c16', '#501e0b']))
mediaScopePalette.addColor(new Color('Zinc', ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b']))

MediaScope.args = {
  dark: false,
  palette: mediaScopePalette
}


export const Monochromatic = Template.bind({})

Monochromatic.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#da4e44',
    PaletteScheme.MONOCHROMATIC
  )
}


export const Analogous = Template.bind({})

Analogous.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#77cf97',
    PaletteScheme.ANALOGOUS
  )
}


export const Complementary = Template.bind({})

Complementary.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#ff7231',
    PaletteScheme.COMPLEMENTARY
  )
}


export const Split = Template.bind({})

Split.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#29cddc',
    PaletteScheme.SPLIT
  )
}


export const Triadic = Template.bind({})

Triadic.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#00ad64',
    PaletteScheme.TRIADIC
  )
}


export const Compound = Template.bind({})

Compound.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#66b032',
    PaletteScheme.COMPOUND
  )
}


export const Rainbow = Template.bind({})

Rainbow.args = {
  dark: false,
  palette: PaletteGenerator.generatePalette(
    '#ff1100',
    PaletteScheme.RAINBOW
    )
}