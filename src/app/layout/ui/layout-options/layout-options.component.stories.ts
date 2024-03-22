import { Meta } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { LayoutOptionsComponent } from './layout-options.component';

const meta: Meta<LayoutOptionsComponent> = {
  title: 'Layout/Options',
  component: LayoutOptionsComponent,
  tags: ['autodocs'],
  argTypes: {
    language: {
      defaultValue: 'en',
      type: {
        name: 'enum',
        value: ['en', 'de'],
        required: true
      },
      control: 'select'
    },
    theme: {
      defaultValue: 'light',
      type: {
        name: 'enum',
        value: ['light', 'dark'],
        required: true
      },
      control: 'select'
    }
  }
};
export default meta;

export const Options = createStory<LayoutOptionsComponent>({
  args: {
    language: 'en',
    theme: 'light'
  }
});
