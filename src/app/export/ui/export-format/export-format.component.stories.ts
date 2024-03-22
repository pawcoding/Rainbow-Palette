import { Meta } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { ExportFormatComponent } from './export-format.component';

const meta: Meta<ExportFormatComponent> = {
  title: 'Export/Format',
  component: ExportFormatComponent,
  tags: ['autodocs'],
  argTypes: {
    choseExportFormat: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const Format = createStory<ExportFormatComponent>({});
