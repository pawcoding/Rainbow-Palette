import { Component, EventEmitter, Output, model, signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
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

  protected readonly isValid = signal(true);

  @Output()
  public readonly generate = new EventEmitter<{
    hex: string;
    schema: unknown;
  }>();

  protected readonly heroChevronDownMini = heroChevronDownMini;

  protected get schemeOptions() {
    return [
      { value: 'rainbow', label: 'scheme.rainbow' },
      { value: 'random', label: 'scheme.random' },
    ];
  }

  protected generatePalette(): void {
    this.generate.emit({ hex: this.hex(), schema: 'random' });
  }
}
