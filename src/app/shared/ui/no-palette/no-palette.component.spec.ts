import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NoPaletteComponent } from './no-palette.component';

describe('NoPaletteComponent', () => {
  let component: NoPaletteComponent;
  let fixture: ComponentFixture<NoPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoPaletteComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoPaletteComponent);
    component = fixture.componentInstance;

    //@ts-expect-error - Bind required input signal
    component.parent = signal('view');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
