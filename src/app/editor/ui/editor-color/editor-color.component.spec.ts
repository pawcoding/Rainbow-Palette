import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Color } from '../../../shared/model/color.model';
import { Shade } from '../../../shared/model/shade.model';
import { EditorColorComponent } from './editor-color.component';

describe('EditorColorComponent', () => {
  let component: EditorColorComponent;
  let fixture: ComponentFixture<EditorColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorColorComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            color: new Color([Shade.random()], 'TestColor'),
            shadeIndex: 0,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
