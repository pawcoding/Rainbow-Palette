import { Meta } from '@storybook/angular';
import { ExportFormat } from '../../../shared/constants/export-format';
import { createStory } from '../../../shared/utils/storybook';
import { ExportDownloadComponent } from './export-download.component';

const meta: Meta<ExportDownloadComponent> = {
  title: 'Export/Download',
  component: ExportDownloadComponent,
  tags: ['autodocs'],
  argTypes: {
    exportFormat: {
      control: 'select',
      type: {
        name: 'enum',
        value: Object.values(ExportFormat).filter((format) => format !== ExportFormat.OTHER),
        required: true
      }
    },
    choseDownloadFormat: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const Download = createStory<ExportDownloadComponent>({
  args: { exportFormat: ExportFormat.LESS }
});
