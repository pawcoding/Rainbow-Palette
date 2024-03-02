import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  ColorNameService,
  ColorNameServiceMock,
} from '../shared/data-access/color-name.service';
import { Color } from '../shared/model/color.model';
import { Shade } from '../shared/model/shade.model';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
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
        { provide: ColorNameService, useValue: new ColorNameServiceMock() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
