import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ColorService, ColorServiceMock } from '../shared/data-access';
import { Color, Shade } from '../shared/model';
import { EditorComponent, UpdateType } from './editor.component';

describe('EditorComponent', () => {
  let colorService: ColorServiceMock;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    colorService = new ColorServiceMock();

    await TestBed.configureTestingModule({
      imports: [EditorComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            color: new Color([Shade.random()], 'TestColor'),
            shadeIndex: 0,
          },
        },
        { provide: DialogRef, useValue: {} },
        { provide: ColorService, useValue: colorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should regenerate shades on shade release', () => {
    spyOn(colorService, 'regenerateShades');

    const shade = Shade.random();
    shade.fixed = true;

    component.unfixShade(shade);

    expect(shade.fixed).toBeFalse();
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(1);
  });

  it('should regenerate shades on color update', () => {
    spyOn(colorService, 'regenerateShades');

    component.update(UpdateType.HEX, '#ffffff');
    component.update(UpdateType.HUE, 0);
    component.update(UpdateType.SATURATION, 0);
    component.update(UpdateType.LIGHTNESS, 0);

    expect(colorService.regenerateShades).toHaveBeenCalledTimes(4);
  });
});
