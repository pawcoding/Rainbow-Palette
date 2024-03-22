import { Meta } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { HomeManualComponent } from './home-manual.component';

const meta: Meta<HomeManualComponent> = {
  title: 'Home/Manual',
  component: HomeManualComponent,
  tags: ['autodocs']
};
export default meta;

export const Manual = createStory<HomeManualComponent>({});
