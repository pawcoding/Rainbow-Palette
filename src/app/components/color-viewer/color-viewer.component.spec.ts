import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorViewerComponent } from './color-viewer.component';

describe('ColorViewerComponent', () => {
  let component: ColorViewerComponent;
  let fixture: ComponentFixture<ColorViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
