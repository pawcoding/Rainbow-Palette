import { Meta } from '@storybook/angular';
import { createStory } from '../../utils/storybook';
import { ColorInputComponent } from './color-input.component';

const meta: Meta<ColorInputComponent> = {
  title: 'Shared/Color Input',
  component: ColorInputComponent,
  tags: ['autodocs'],
  argTypes: {}
};
export default meta;

export const ColorInput = createStory<ColorInputComponent>({
  args: {
    placeholder: 'Color',
    tooltip: 'Select a color',
    hex: '#3b82f6'
  }
});
