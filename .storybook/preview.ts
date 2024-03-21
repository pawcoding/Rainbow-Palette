import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, type Preview } from '@storybook/angular';
import docJson from '../documentation.json';
import { StorybookTranslateModule } from './utils';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(StorybookTranslateModule)]
    })
  ]
};
export default preview;
