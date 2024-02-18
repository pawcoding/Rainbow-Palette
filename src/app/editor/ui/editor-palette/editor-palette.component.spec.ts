import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Palette } from '../../../shared/model/palette.model';
import { EditorPaletteComponent } from './editor-palette.component';

describe('EditorPaletteComponent', () => {
  let component: EditorPaletteComponent;
  let fixture: ComponentFixture<EditorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPaletteComponent);
    component = fixture.componentInstance;

    // @ts-expect-error
    component.palette = signal(new Palette());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
