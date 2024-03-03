import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  LanguageService,
  LanguageServiceMock,
} from '../shared/data-access/language.service';
import {
  MobileService,
  MobileServiceMock,
} from '../shared/data-access/mobile.service';
import { ThemeService, ThemeServiceMock } from './data-access/theme.service';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let themeService: ThemeServiceMock;
  let languageService: LanguageServiceMock;

  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    themeService = new ThemeServiceMock();
    languageService = new LanguageServiceMock();

    await TestBed.configureTestingModule({
      imports: [LayoutComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: ThemeService, useValue: themeService },
        { provide: LanguageService, useValue: languageService },
        { provide: MobileService, useClass: MobileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update theme on theme change', () => {
    spyOn(themeService, 'setTheme');

    component.changeTheme('dark');

    expect(themeService.setTheme).toHaveBeenCalledWith('dark');
  });

  it('should update language on language change', () => {
    spyOn(languageService, 'setLanguage');

    component.changeLanguage('de');

    expect(languageService.setLanguage).toHaveBeenCalledWith('de');
  });
});
