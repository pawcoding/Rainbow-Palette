import { Meta, applicationConfig, argsToTemplate } from '@storybook/angular';
import { IS_RUNNING_TEST } from '../../utils/is-running-test';
import { createStory } from '../../utils/storybook';
import { DropdownMenuComponent } from './dropdown-menu.component';

const meta: Meta<DropdownMenuComponent<string>> = {
  title: 'Shared/Dropdown Menu',
  component: DropdownMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: {
        type: 'object'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    closeOnScroll: {
      control: {
        type: 'boolean'
      }
    },
    highlightSelection: {
      control: {
        type: 'boolean'
      }
    },
    selectedItem: {
      control: {
        type: 'text'
      }
    },
    itemTemplate: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const Default = createStory<DropdownMenuComponent<string>>({
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
    title: 'Select an item',
    disabled: false,
    closeOnScroll: true,
    highlightSelection: false,
    selectedItem: 'Item 1'
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: IS_RUNNING_TEST, useValue: true }]
    })
  ],
  render: (args) => ({
    template: `
    <div class="max-w-lg mx-auto">
      <rp-dropdown-menu ${argsToTemplate(args)}>
        <button class="bg-blue-500 w-full rounded-md px-4 py-2 text-neutral-50 font-semibold cursor-pointer">
          Open DropDown
        </button>
      </rp-dropdown-menu>
    </div>`
  })
});

export const Content = createStory<DropdownMenuComponent<string>>({
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
    title: 'Select an item',
    disabled: false,
    closeOnScroll: true,
    highlightSelection: false,
    selectedItem: 'Item 1'
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: IS_RUNNING_TEST, useValue: true }]
    })
  ],
  render: (args) => ({
    template: `
    <div class="max-w-lg mx-auto">
      <rp-dropdown-menu ${argsToTemplate(args)}>
        <button class="bg-blue-500 w-full rounded-md px-4 py-2 text-neutral-50 font-semibold cursor-pointer">
          Open DropDown
        </button>

        <ng-template #itemTemplate let-item="item">
          <span class="uppercase block text-right">{{item}}</span>
        </ng-template>
      </rp-dropdown-menu>
    </div>`
  })
});
