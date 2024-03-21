import { Meta, argsToTemplate } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { EditorRangeComponent } from './editor-range.component';

const meta: Meta<EditorRangeComponent> = {
  title: 'Editor/Range',
  component: EditorRangeComponent,
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

export const Hue = createStory<EditorRangeComponent>({
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
            <rp-editor-range ${argsToTemplate(args)} (valueChange)="parent.style.setProperty('--editor-hue', $event)" />
        </div>`
  })
});
export const Saturation = createStory<EditorRangeComponent>({
  args: {
    label: 'Saturation',
    tooltip: 'Adjust the saturation',
    key: 'saturation',
    value: 50
  },
  render: (args) => ({
    template: `
        <div #parent style="--editor-hue: 180; --editor-saturation: ${args.value}%; --editor-lightness: 50%">
            <rp-editor-range ${argsToTemplate(args)} (valueChange)="parent.style.setProperty('--editor-saturation', $event + '%')" />
        </div>`
  })
});
export const Lightness = createStory<EditorRangeComponent>({
  args: {
    label: 'Lightness',
    tooltip: 'Adjust the lightness',
    key: 'lightness',
    value: 50
  },
  render: (args) => ({
    template: `
        <div #parent style="--editor-hue: 180; --editor-saturation: 100%; --editor-lightness: ${args.value}%">
            <rp-editor-range ${argsToTemplate(args)} (valueChange)="parent.style.setProperty('--editor-lightness', $event + '%')" />
        </div>`
  })
});
