/* eslint-disable storybook/story-exports */
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Meta, applicationConfig } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { NAVIGATION_ENTRIES } from '../../constants/navigation-entries';
import { LayoutNavigationComponent } from './layout-navigation.component';

@Component({
  selector: 'rp-test',
  template: ''
})
class TestComponent {}

const meta: Meta<LayoutNavigationComponent> = {
  title: 'Layout/Navigation',
  component: LayoutNavigationComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([{ path: '**/*', component: TestComponent }])]
    })
  ],
  argTypes: {
    navigationEntries: {
      type: {
        name: 'array',
        value: {
          name: 'object',
          value: {
            title: {
              name: 'string',
              required: true
            },
            path: {
              name: 'string',
              required: true
            },
            icon: {
              name: 'string',
              required: true
            },
            description: {
              name: 'string',
              required: true
            }
          }
        },
        required: true
      }
    }
  }
};
export default meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navigation = createStory<LayoutNavigationComponent>({
  args: {
    navigationEntries: NAVIGATION_ENTRIES
  }
});
