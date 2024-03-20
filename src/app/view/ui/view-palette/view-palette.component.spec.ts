import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Palette } from '../../../shared/model';
import { ViewPaletteComponent } from './view-palette.component';

describe('ViewPaletteComponent', () => {
  let component: ViewPaletteComponent;
  let fixture: ComponentFixture<ViewPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPaletteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPaletteComponent);
    component = fixture.componentInstance;

    // @ts-expect-error - Bind required input signal
    component.palette = signal(new Palette());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
