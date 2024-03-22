import { Meta } from '@storybook/angular';
import { ExportFormat } from '../../../shared/constants/export-format';
import { createStory } from '../../../shared/utils/storybook';
import { ExportSuccessComponent } from './export-success.component';

const meta: Meta<ExportSuccessComponent> = {
  title: 'Export/Success',
  component: ExportSuccessComponent,
  tags: ['autodocs'],
  argTypes: {
    exportOption: {
      type: {
        name: 'enum',
        value: ['copy', 'file'],
        required: true
      }
    },
    exportFormat: {
      control: 'select',
      type: {
        name: 'enum',
        value: Object.values(ExportFormat).filter((format) => format !== ExportFormat.OTHER),
        required: true
      }
    },
    openDocumentation: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const Copy = createStory<ExportSuccessComponent>({
  args: { exportOption: 'copy', exportFormat: ExportFormat.CSS }
});
export const File = createStory<ExportSuccessComponent>({
  args: { exportOption: 'file', exportFormat: ExportFormat.TAILWIND }
});
