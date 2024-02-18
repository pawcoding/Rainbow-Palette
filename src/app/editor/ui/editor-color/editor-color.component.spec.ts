import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorColorComponent } from './editor-color.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Color } from '../../../shared/model/color.model';

describe('EditorColorComponent', () => {
  let component: EditorColorComponent;
  let fixture: ComponentFixture<EditorColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorColorComponent],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            color: Color.random(),
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
