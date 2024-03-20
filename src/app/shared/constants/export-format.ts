import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import {
  simpleCss3,
  simpleLess,
  simpleSass,
  simpleTailwindcss
} from '@ng-icons/simple-icons';

export enum ExportFormat {
  CSS = 'css',
  SCSS = 'scss',
  LESS = 'less',
  TAILWIND = 'tailwind',
  OTHER = 'other',
}

export const EXPORT_FORMATS: Array<{
  format: ExportFormat;
  label: string;
  icon: string;
  color: string;
}> = [
  {
    format: ExportFormat.CSS,
    label: 'export.format.css',
    icon: simpleCss3,
    color: '#1572B6'
  },
  {
    format: ExportFormat.SCSS,
    label: 'export.format.scss',
    icon: simpleSass,
    color: '#CC6699'
  },
  {
    format: ExportFormat.LESS,
    label: 'export.format.less',
    icon: simpleLess,
    color: '#1D365D'
  },
  {
    format: ExportFormat.TAILWIND,
    label: 'export.format.tailwind',
    icon: simpleTailwindcss,
    color: '#06B6D4'
  },
  {
    format: ExportFormat.OTHER,
    label: 'export.format.other',
    icon: heroPlusCircle,
    color: '#171717'
  }
];
