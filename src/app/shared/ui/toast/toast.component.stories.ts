import { Meta } from '@storybook/angular';
import { createStory } from '../../utils/storybook';
import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Shared/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  argTypes: {
    toast: {
      type: {
        required: true,
        name: 'object',
        value: {
          type: {
            name: 'enum',
            value: ['default', 'success', 'error', 'warning', 'info']
          },
          message: {
            name: 'string',
            required: true
          },
          parameters: {
            name: 'object',
            value: {}
          }
        }
      }
    }
  }
};
export default meta;

export const Default = createStory<ToastComponent>({
  args: {
    toast: { type: 'default', message: 'Default toast' }
  }
});
export const Success = createStory<ToastComponent>({
  args: {
    toast: { type: 'success', message: 'Success toast' }
  }
});
export const Error = createStory<ToastComponent>({
  args: {
    toast: { type: 'error', message: 'Error toast' }
  }
});
export const Warning = createStory<ToastComponent>({
  args: {
    toast: { type: 'warning', message: 'Warning toast' }
  }
});
export const Info = createStory<ToastComponent>({
  args: {
    toast: { type: 'info', message: 'Info toast' }
  }
});
