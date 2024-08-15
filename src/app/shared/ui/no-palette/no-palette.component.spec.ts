import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, LanguageServiceMock } from '../../data-access/language.service';
import { MobileService, MobileServiceMock } from '../../data-access/mobile.service';
import { IS_RUNNING_TEST } from '../../utils/is-running-test';
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
        },
        {
          provide: LanguageService,
          useClass: LanguageServiceMock
        },
        {
          provide: MobileService,
          useClass: MobileServiceMock
        },
        {
          provide: IS_RUNNING_TEST,
          useValue: true
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
