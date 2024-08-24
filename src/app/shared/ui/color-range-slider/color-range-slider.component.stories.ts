import { Meta, argsToTemplate } from '@storybook/angular';
import { createStory } from '../../utils/storybook';
import { ColorRangeSliderComponent } from './color-range-slider.component';

const meta: Meta<ColorRangeSliderComponent> = {
  title: 'Shared/Color Range Slider',
  component: ColorRangeSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    key: {
      options: ['hue', 'saturation', 'lightness'],
      control: { type: 'radio' }
    },
    value: {
      control: { type: 'range', min: 0, max: 359, step: 1 }
    },
    min: {
      control: { type: 'number' }
    },
    max: {
      control: { type: 'number' }
    }
  }
};
export default meta;

export const Hue = createStory<ColorRangeSliderComponent>({
  args: {
    label: 'Hue',
    tooltip: 'Adjust the hue',
    key: 'hue',
    value: 180,
    max: 359
  },
  render: (args) => ({
    template: `
        <div #parent style="--editor-hue: ${args.value}; --editor-saturation: 100%; --editor-lightness: 50%">
            <rp-color-range-slider ${argsToTemplate(args)} (valueChange)="parent.style.setProperty('--editor-hue', $event)" />
        </div>`
  })
});
export const Saturation = createStory<ColorRangeSliderComponent>({
  args: {
    label: 'Saturation',
    tooltip: 'Adjust the saturation',
    key: 'saturation',
    value: 50
  },
  render: (args) => ({
    template: `
        <div #parent style="--editor-hue: 180; --editor-saturation: ${args.value}%; --editor-lightness: 50%">
            <rp-color-range-slider ${argsToTemplate(args)} (valueChange)="parent.style.setProperty('--editor-saturation', $event + '%')" />
        </div>`
  })
});
export const Lightness = createStory<ColorRangeSliderComponent>({
  args: {
    label: 'Lightness',
    tooltip: 'Adjust the lightness',
    key: 'lightness',
    value: 50
  },
  render: (args) => ({
    template: `
        <div #parent style="--editor-hue: 180; --editor-saturation: 100%; --editor-lightness: ${args.value}%">
            <rp-color-range-slider ${argsToTemplate(args)} (valueChange)="parent.style.setProperty('--editor-lightness', $event + '%')" />
        </div>`
  })
});
