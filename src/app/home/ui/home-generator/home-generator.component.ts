import {
  Component,
  EventEmitter,
  Output,
  computed,
  model,
  signal,
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import {
  PALETTE_SCHEMES,
  PaletteScheme,
} from '../../../shared/constants/palette-scheme';
import { ColorInputComponent } from '../../../shared/ui/color-input/color-input.component';
import { DropdownMenuComponent } from '../../../shared/ui/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'rp-home-generator',
  standalone: true,
  imports: [
    TranslateModule,
    DropdownMenuComponent,
    NgIconComponent,
    ColorInputComponent,
  ],
  templateUrl: './home-generator.component.html',
})
export class HomeGeneratorComponent {
  public readonly hex = model('#3B82F6');
  public readonly scheme = model(PaletteScheme.RAINBOW);

  protected readonly isValid = signal(true);

  @Output()
  public readonly generate = new EventEmitter<void>();

  protected readonly heroChevronDownMini = heroChevronDownMini;

  protected get schemeOptions() {
    return PALETTE_SCHEMES;
  }

  protected readonly selectedScheme = computed(() =>
    this.schemeOptions.find((option) => option.value === this.scheme())
  );

  protected setScheme(value: PaletteScheme) {
    this.scheme.set(value);
  }

  protected generatePalette(): void {
    this.generate.emit();
  }
}
