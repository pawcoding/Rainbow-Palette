import { ActivatedRoute } from '@angular/router';
import { Meta, applicationConfig } from '@storybook/angular';
import { VersionService, VersionServiceMock } from '../../../shared/data-access/version.service';
import { createStory } from '../../../shared/utils/storybook';
import { LayoutFooterComponent } from './layout-footer.component';

const meta: Meta<LayoutFooterComponent> = {
  title: 'Layout/Footer',
  component: LayoutFooterComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: VersionService, useClass: VersionServiceMock }
      ]
    })
  ],
  argTypes: {}
};
export default meta;

export const Footer = createStory<LayoutFooterComponent>({
  args: {
    logoAsset: 'assets/rainbow-palette-dark.svg'
  }
});
