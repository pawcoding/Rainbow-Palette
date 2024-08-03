import { DIALOG_DATA } from '@angular/cdk/dialog';
import { applicationConfig, Meta } from '@storybook/angular';
import { createStory } from '../../utils/storybook';
import { DialogComponent } from './dialog.component';

const meta: Meta<DialogComponent> = {
  title: 'Shared/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  argTypes: {}
};
export default meta;

export const Alert = createStory<DialogComponent>({
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            type: 'alert',
            title: 'Alert',
            message: 'This is an alert message.'
          }
        }
      ]
    })
  ]
});

export const Confirm = createStory<DialogComponent>({
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            type: 'confirm',
            title: 'Confirm',
            message: 'This is a confirm message.',
            confirmLabel: 'Yes'
          }
        }
      ]
    })
  ]
});

export const Prompt = createStory<DialogComponent>({
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            type: 'prompt',
            title: 'Prompt',
            message: 'This is a prompt message.',
            confirmLabel: 'Save',
            label: 'Name',
            placeholder: 'Enter your name',
            initialValue: 'John Doe'
          }
        }
      ]
    })
  ]
});
