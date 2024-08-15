import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Meta, applicationConfig } from '@storybook/angular';
import { Tailwind } from '../shared/constants/tailwind-colors';
import { AnalyticsService, AnalyticsServiceMock } from '../shared/data-access/analytics.service';
import { ConfettiService, ConfettiServiceMock } from '../shared/data-access/confetti.service';
import { ExportService, ExportServiceMock } from '../shared/data-access/export.service';
import { ToastService, ToastServiceMock } from '../shared/data-access/toast.service';
import { createStory } from '../shared/utils/storybook';
import { ExportModalComponent } from './export-modal.component';

const meta: Meta<ExportModalComponent> = {
  title: 'Export/Export',
  component: ExportModalComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        { provide: DIALOG_DATA, useValue: { palette: Tailwind } },
        {
          provide: DialogRef,
          useValue: {
            close: (): void => {}
          }
        },
        { provide: ToastService, useClass: ToastServiceMock },
        { provide: ExportService, useClass: ExportServiceMock },
        { provide: AnalyticsService, useClass: AnalyticsServiceMock },
        { provide: ConfettiService, useClass: ConfettiServiceMock }
      ]
    })
  ]
};
export default meta;

export const Export = createStory<ExportModalComponent>({});
