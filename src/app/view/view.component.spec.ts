import { Dialog } from '@angular/cdk/dialog';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ColorEditorService, ColorEditorServiceMock } from '../editor/data-access/color-editor.service';
import { ExportModalService } from '../export/data-access/export-modal.service';
import { TailwindGrays } from '../shared/constants/tailwind-colors';
import { AnalyticsService, AnalyticsServiceMock } from '../shared/data-access/analytics.service';
import { ColorService, ColorServiceMock } from '../shared/data-access/color.service';
import { DialogService, DialogServiceMock } from '../shared/data-access/dialog.service';
import { ListService, ListServiceMock } from '../shared/data-access/list.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { PaletteServiceMock } from '../shared/data-access/palette.service-mock';
import { PwaService, PwaServiceMock } from '../shared/data-access/pwa.service';
import { ToastService, ToastServiceMock } from '../shared/data-access/toast.service';
import { TrackingEventAction, TrackingEventCategory } from '../shared/enums/tracking-event';
import { Color, Shade } from '../shared/model';
import { DialogMock } from '../shared/utils/dialog-mock';
import { IS_RUNNING_TEST } from '../shared/utils/is-running-test';
import ViewComponent from './view.component';

describe('ViewComponent', () => {
  let colorEditorService: ColorEditorServiceMock;
  let colorService: ColorServiceMock;
  let dialogService: DialogServiceMock;
  const exportModalService = jasmine.createSpyObj('ExportModalService', ['openExportModal']);
  let paletteService: PaletteServiceMock;
  let toastService: ToastServiceMock;
  let analyticsService: AnalyticsServiceMock;
  let dialog: DialogMock<Color>;

  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    colorEditorService = new ColorEditorServiceMock();
    colorService = new ColorServiceMock();
    dialogService = new DialogServiceMock();
    paletteService = new PaletteServiceMock();
    toastService = new ToastServiceMock();
    analyticsService = new AnalyticsServiceMock();
    dialog = new DialogMock(new Color([], 'Imported'));

    await TestBed.configureTestingModule({
      imports: [ViewComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {} } },
        { provide: ColorEditorService, useValue: colorEditorService },
        { provide: ColorService, useValue: colorService },
        { provide: DialogService, useValue: dialogService },
        { provide: ExportModalService, useValue: exportModalService },
        { provide: PaletteService, useValue: paletteService },
        { provide: ToastService, useValue: toastService },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: PwaService, useClass: PwaServiceMock },
        { provide: IS_RUNNING_TEST, useValue: true },
        { provide: Dialog, useValue: dialog },
        { provide: ListService, useClass: ListServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;

    // @ts-expect-error - read-only property
    component.id = signal('test');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open palette rename dialog', async () => {
    spyOn(dialogService, 'prompt').and.callThrough();
    spyOn(toastService, 'showToast').and.callThrough();

    await component.renamePalette();

    expect(dialogService.prompt).toHaveBeenCalledTimes(1);
    expect(toastService.showToast).toHaveBeenCalledTimes(1);
    expect(component.hasUnsavedChanges()).toBeTrue();
  });

  it('should save palette', async () => {
    spyOn(paletteService, 'savePaletteToLocalStorage').and.callThrough();
    spyOn(toastService, 'showToast').and.callThrough();
    spyOn(analyticsService, 'trackEvent').and.callThrough();

    await component.savePalette();

    expect(paletteService.savePaletteToLocalStorage).toHaveBeenCalledTimes(1);
    expect(toastService.showToast).toHaveBeenCalledTimes(1);
    expect(analyticsService.trackEvent).toHaveBeenCalledWith(
      TrackingEventCategory.SAVE_PALETTE,
      TrackingEventAction.SAVE_PALETTE_LOCAL_STORAGE
    );
    expect(component.hasUnsavedChanges()).toBeFalse();
  });

  it('should open color rename dialog', async () => {
    spyOn(dialogService, 'prompt').and.callThrough();
    spyOn(toastService, 'showToast').and.callThrough();

    const color = new Color([Shade.random()], 'Color');
    await component.renameColor(color);

    expect(color.name).toBe('Color_test');
    expect(dialogService.prompt).toHaveBeenCalledTimes(1);
    expect(toastService.showToast).toHaveBeenCalledTimes(1);
    expect(component.hasUnsavedChanges()).toBeTrue();
  });

  it('should confirm color delete', async () => {
    spyOn(dialogService, 'confirm').and.callThrough();
    spyOn(toastService, 'showToast').and.callThrough();

    const color = new Color([Shade.random()], 'Color');
    await component.removeColor(color);

    expect(dialogService.confirm).toHaveBeenCalledTimes(1);
    expect(toastService.showToast).toHaveBeenCalledTimes(1);
    expect(component.hasUnsavedChanges()).toBeTrue();
  });

  it('should open color editor on color edit', async () => {
    spyOn(colorEditorService, 'openColorEditor').and.callThrough();

    const color = new Color([Shade.random()], 'Test');
    await component.editColor(color, 5);

    expect(colorEditorService.openColorEditor).toHaveBeenCalledTimes(1);
    expect(colorEditorService.openColorEditor).toHaveBeenCalledWith(color, 5);
    expect(component.hasUnsavedChanges()).toBeTrue();
  });

  it('should add random color', async () => {
    spyOn(colorService, 'randomColor').and.callThrough();

    await component.addColor();

    expect(colorService.randomColor).toHaveBeenCalledTimes(1);
    expect(component.hasUnsavedChanges()).toBeTrue();
  });

  it('should import color', async () => {
    spyOn(dialog, 'open').and.callThrough();

    await component.importColor();

    const colors = paletteService.palette()?.colors;

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(colors).toBeTruthy();
    expect(colors![colors!.length - 1].name).toBe('Imported');
    expect(component.hasUnsavedChanges()).toBeTrue();
  });

  it('should open export modal', async () => {
    await component.exportPalette();

    expect(exportModalService.openExportModal).toHaveBeenCalledTimes(1);
  });

  it('should show toast on clipboard copy', async () => {
    spyOn(toastService, 'showToast').and.callThrough();

    await component.copyToClipboard(Shade.random());

    expect(toastService.showToast).toHaveBeenCalledTimes(1);
  });

  it('should reorder colors', async () => {
    paletteService.palette.set(TailwindGrays);
    const first = TailwindGrays.colors[0];

    component.reorderColor(2, 2);
    expect(component.hasUnsavedChanges()).toBeFalse();

    component.reorderColor(0, 1);
    expect(paletteService.palette()?.colors[1]).toBe(first);
    expect(component.hasUnsavedChanges()).toBeTrue();
  });
});
