import { ActivatedRoute } from '@angular/router';
import { Meta, applicationConfig } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { LayoutAnalyticsConsentComponent } from './layout-analytics-consent.component';

const meta: Meta<LayoutAnalyticsConsentComponent> = {
  title: 'Layout/Analytics Consent',
  component: LayoutAnalyticsConsentComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    })
  ],
  argTypes: {
    consent: {
      table: {
        disable: true
      }
    },
    height: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const AnalyticsConsent = createStory<LayoutAnalyticsConsentComponent>({});
