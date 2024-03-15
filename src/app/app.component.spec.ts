import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import {
  AnalyticsService,
  AnalyticsServiceMock,
} from './shared/data-access/analytics.service';
import {
  LanguageService,
  LanguageServiceMock,
} from './shared/data-access/language.service';
import {
  MobileService,
  MobileServiceMock,
} from './shared/data-access/mobile.service';
import {
  PaletteService,
  PaletteServiceMock,
} from './shared/data-access/palette.service';
import { PwaService, PwaServiceMock } from './shared/data-access/pwa.service';
import {
  ThemeService,
  ThemeServiceMock,
} from './shared/data-access/theme.service';
import {
  VersionService,
  VersionServiceMock,
} from './shared/data-access/version.service';

describe('AppComponent', () => {
  let paletteService: PaletteServiceMock;

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    paletteService = new PaletteServiceMock();

    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        // Explicit providers
        { provide: PaletteService, useValue: paletteService },
        { provide: VersionService, useClass: VersionServiceMock },
        { provide: PwaService, useClass: PwaServiceMock },
        // Implicit providers from LayoutComponent
        { provide: MobileService, useClass: MobileServiceMock },
        { provide: ThemeService, useClass: ThemeServiceMock },
        { provide: AnalyticsService, useClass: AnalyticsServiceMock },
        { provide: LanguageService, useClass: LanguageServiceMock },
      ],
    }).compileComponents();

    spyOn(paletteService, 'loadPaletteFromLocalStorage');

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should load palette on startup', () => {
    expect(paletteService.loadPaletteFromLocalStorage).toHaveBeenCalled();
  });
});
