import { ActivatedRoute } from '@angular/router';
import { Meta, applicationConfig } from '@storybook/angular';
import { createStory } from '../../utils/storybook';
import { NoPaletteComponent } from './no-palette.component';

const meta: Meta<NoPaletteComponent> = {
  title: 'Shared/No Palette',
  component: NoPaletteComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    })
  ],
  argTypes: {
    parent: {
      type: {
        name: 'enum',
        value: ['view', 'palette', 'preview'],
        required: true
      }
    }
  }
};
export default meta;

export const View = createStory<NoPaletteComponent>({
  args: {
    parent: 'view'
  }
});
export const Palette = createStory<NoPaletteComponent>({
  args: {
    parent: 'palette'
  }
});
export const Preview = createStory<NoPaletteComponent>({
  args: {
    parent: 'preview'
  }
});
