import { Meta } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { RequestFormatComponent } from './request-format.component';

const meta: Meta<RequestFormatComponent> = {
  title: 'Export/Request Format',
  component: RequestFormatComponent,
  tags: ['autodocs']
};
export default meta;

export const RequestFormat = createStory<RequestFormatComponent>({});
