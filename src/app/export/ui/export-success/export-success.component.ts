import {
  Component,
  EventEmitter,
  Output,
  computed,
  input
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { string_to_unicode_variant as toUnicodeVariant } from 'string-to-unicode-variant';
import { ExportFormat } from '../../../shared/constants/export-format';
import { ExportOption } from '../../../shared/types/export-option';

@Component({
  selector: 'rp-export-success',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './export-success.component.html',
  styles: `:host { display: block; }`
})
export class ExportSuccessComponent {
  public readonly exportFormat = input.required<ExportFormat>();
  public readonly exportOption = input.required<ExportOption>();

  @Output()
  public readonly openDocumentation = new EventEmitter<void>();

  protected readonly description = computed(() => {
    return `export.success.description.${this.exportFormat()}.${this.exportOption()}`;
  });

  protected readonly descriptionParams = computed<{
    config?: string;
    docs: string;
    file?: string;
    link?: string;
    root?: string;
    usage?: string;
  }>(() => {
    const option = this.exportOption();

    if (option === 'copy') {
      switch (this.exportFormat()) {
        case ExportFormat.CSS:
          return {
            docs: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#using_the_root_pseudo-class',
            root: toUnicodeVariant(':root', 'm'),
            usage: toUnicodeVariant('color: var(--color-100);', 'm')
          };
        case ExportFormat.SCSS:
          return {
            docs: 'https://sass-lang.com/documentation/variables',
            usage: toUnicodeVariant('color: $color-500;', 'm')
          };
        case ExportFormat.LESS:
          return {
            docs: 'https://lesscss.org/features/#variables-feature-overview',
            usage: toUnicodeVariant('color: @color-500;', 'm')
          };
        case ExportFormat.TAILWIND:
          return {
            config: toUnicodeVariant('tailwind.config.js', 'm'),
            docs: 'https://tailwindcss.com/docs/customizing-colors#color-object-syntax'
          };
        default:
          return { docs: '' };
      }
    } else {
      switch (this.exportFormat()) {
        case ExportFormat.CSS:
          return {
            docs: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#using_the_root_pseudo-class',
            file: toUnicodeVariant('colors.css', 'm'),
            link: toUnicodeVariant(
              '<link rel="stylesheet" href="/colors.css">',
              'm'
            ),
            usage: toUnicodeVariant('color: var(--color-100);', 'm')
          };
        case ExportFormat.SCSS:
          return {
            docs: 'https://sass-lang.com/documentation/at-rules/use',
            file: toUnicodeVariant('_colors.scss', 'm'),
            link: toUnicodeVariant("@use 'colors'", 'm'),
            usage: toUnicodeVariant('color: $color-500;', 'm')
          };
        case ExportFormat.LESS:
          return {
            docs: 'https://lesscss.org/features/#import-atrules-feature',
            file: toUnicodeVariant('colors.less', 'm'),
            link: toUnicodeVariant("@import 'colors.less'", 'm'),
            usage: toUnicodeVariant('color: @color-500;', 'm')
          };
        case ExportFormat.TAILWIND:
          return {
            config: toUnicodeVariant('tailwind.config.js', 'm'),
            docs: 'https://tailwindcss.com/docs/customizing-colors#using-the-default-colors',
            file: toUnicodeVariant('tailwind.colors.js', 'm'),
            import: toUnicodeVariant(
              "colors: require('./tailwind.colors'),",
              'm'
            )
          };
        default:
          return { docs: '' };
      }
    }
  });

  protected openDocs(): void {
    this.openDocumentation.emit();
  }
}
