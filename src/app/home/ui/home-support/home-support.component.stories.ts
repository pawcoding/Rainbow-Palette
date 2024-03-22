import { Meta } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { HomeSupportComponent } from './home-support.component';

const meta: Meta<HomeSupportComponent> = {
  title: 'Home/Support',
  component: HomeSupportComponent,
  tags: ['autodocs']
};
export default meta;

export const Support = createStory<HomeSupportComponent>({});
