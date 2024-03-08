import { Component, computed, model } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMoonSolid, heroSunSolid } from '@ng-icons/heroicons/solid';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownMenuComponent } from '../../../shared/ui/dropdown-menu/dropdown-menu.component';
import { LANGUAGE_OPTIONS } from '../../constants/languages';
import { THEME_OPTIONS } from '../../constants/themes';
import { Language, LanguageOption } from '../../types/language';
import { Theme, ThemeOption } from '../../../shared/types/theme';

@Component({
  selector: 'rp-layout-options',
  standalone: true,
  imports: [TranslateModule, DropdownMenuComponent, NgIconComponent],
  templateUrl: './layout-options.component.html',
  providers: [
    provideIcons({
      heroSunSolid,
      heroMoonSolid,
    }),
  ],
})
export class LayoutOptionsComponent {
  public readonly language = model.required<Language>();
  public readonly theme = model.required<Theme>();

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

  protected changeLanguage(language: Language): void {
    this.language.set(language);
  }

  protected changeTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
