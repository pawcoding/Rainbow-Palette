import { setCompodocJson } from '@storybook/addon-docs/angular'
import { Parameters, Preview } from '@storybook/angular'
import docJson from '../documentation.json'

setCompodocJson(docJson)

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}

export const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
}
