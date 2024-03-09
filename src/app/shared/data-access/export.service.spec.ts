import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormat } from '../constants/export-format';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { AnalyticsService, AnalyticsServiceMock } from './analytics.service';
import { ExportService } from './export.service';
import { ToastService, ToastServiceMock } from './toast.service';

describe('ExportService', () => {
  let analyticsService: AnalyticsServiceMock;
  let service: ExportService;

  const palette = new Palette('TestPalette', [
    new Color([Shade.random()], 'TestColor'),
  ]);

  beforeEach(() => {
    analyticsService = new AnalyticsServiceMock();

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ToastService, useClass: ToastServiceMock },
        { provide: AnalyticsService, useValue: analyticsService },
      ],
    });
    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export palette', async () => {
    spyOn(analyticsService, 'trackPaletteExport');
    spyOn(service, 'copy').and.resolveTo(true);
    spyOn(service, 'download').and.resolveTo(true);

    const format = ExportFormat.CSS;
    const result = await service.exportPalette(palette, format, 'copy');

    expect(result).toBe(true);
    expect(service.copy).toHaveBeenCalled();

    const result2 = await service.exportPalette(palette, format, 'file');

    expect(result2).toBe(true);
    expect(service.download).toHaveBeenCalled();
    expect(analyticsService.trackPaletteExport).toHaveBeenCalledTimes(2);
  });

  it('should copy palette to clipboard', async () => {
    spyOn(navigator.clipboard, 'writeText').and.resolveTo();

    const format = ExportFormat.CSS;
    const result = await service.exportPalette(palette, format, 'copy');

    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('should download palette as file', async () => {
    const link = document.createElement('a');
    spyOn(link, 'click');

    spyOn(document, 'createElement').and.returnValue(link);

    const format = ExportFormat.CSS;
    const result = await service.exportPalette(palette, format, 'file');

    expect(result).toBe(true);
    expect(document.createElement).toHaveBeenCalled();
    expect(link.click).toHaveBeenCalled();
  });
});
