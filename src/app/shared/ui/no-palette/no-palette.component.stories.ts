import { ActivatedRoute } from '@angular/router';
import { Meta, applicationConfig } from '@storybook/angular';
import { LanguageService, LanguageServiceMock } from '../../data-access/language.service';
import { MobileService, MobileServiceMock } from '../../data-access/mobile.service';
import { IS_RUNNING_TEST } from '../../utils/is-running-test';
import { createStory } from '../../utils/storybook';
import { NoPaletteComponent } from './no-palette.component';

const meta: Meta<NoPaletteComponent> = {
  title: 'Shared/No Palette',
  component: NoPaletteComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: LanguageService, useClass: LanguageServiceMock },
        {
          provide: MobileService,
          useClass: MobileServiceMock
        },
        {
          provide: IS_RUNNING_TEST,
          useValue: true
        }
      ]
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
