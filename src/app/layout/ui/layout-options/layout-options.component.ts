import {
  CdkMenu,
  CdkMenuGroup,
  CdkMenuItemRadio,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownMenuComponent } from '../../../shared/ui/dropdown-menu/dropdown-menu.component';
import { LANGUAGE_OPTIONS } from '../../constants/languages';
import { THEME_OPTIONS } from '../../constants/themes';
import { Language, LanguageOption } from '../../types/language';
import { Theme, ThemeOption } from '../../types/theme';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMoonSolid, heroSunSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'rp-layout-options',
  standalone: true,
  imports: [
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemRadio,
    TranslateModule,
    DropdownMenuComponent,
    NgIconComponent,
  ],
  templateUrl: './layout-options.component.html',
  providers: [
    provideIcons({
      heroSunSolid,
      heroMoonSolid,
    }),
  ],
})
export class LayoutOptionsComponent {
  public readonly language = input.required<Language>();
  public readonly theme = input.required<Theme>();

  @Output()
  protected readonly languageChange = new EventEmitter<Language>();
  @Output()
  protected readonly themeChange = new EventEmitter<Theme>();

  protected readonly currentLanguage = computed<LanguageOption>(() => {
    return (
      this.languageOptions.find((option) => option.value === this.language()) ??
      this.languageOptions[0]
    );
  });

  protected readonly currentTheme = computed<ThemeOption>(() => {
    return (
      this.themeOptions.find((option) => option.value === this.theme()) ??
      this.themeOptions[0]
    );
  });

  protected get languageOptions() {
    return LANGUAGE_OPTIONS;
  }

  protected get themeOptions() {
    return THEME_OPTIONS;
  }

  protected isLanguageSelected(language: Language): boolean {
    return this.language() === language;
  }

  protected isThemeSelected(theme: Theme): boolean {
    return this.theme() === theme;
  }

  protected changeLanguage(language: Language): void {
    this.languageChange.emit(language);
  }

  protected changeTheme(theme: Theme): void {
    this.themeChange.emit(theme);
  }
}
