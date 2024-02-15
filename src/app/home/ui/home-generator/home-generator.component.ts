import { Component, effect, model, signal, viewChild } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroChevronDownMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownMenuComponent } from '../../../shared/ui/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'rp-home-generator',
  standalone: true,
  imports: [TranslateModule, DropdownMenuComponent, NgIconComponent],
  templateUrl: './home-generator.component.html',
})
export class HomeGeneratorComponent {
  public readonly color = model('#3B82F6');

  protected readonly heroChevronDownMini = heroChevronDownMini;

  protected readonly isValid = signal(true);

  private readonly _hexInput = viewChild.required<{
    nativeElement: HTMLInputElement;
  }>('hexInput');

  constructor() {
    effect(() => {
      this._hexInput().nativeElement.value = this.color();
    });
  }

  protected get schemeOptions() {
    return [
      { value: 'rainbow', label: 'scheme.rainbow' },
      { value: 'random', label: 'scheme.random' },
    ];
  }

  protected setColor(color: string, $event: Event): void {
    // Remove leading and trailing whitespace
    color = color.trim();

    // Remove characters that are not valid hex color characters
    color = color.replace(/[^0-9a-fA-F]/g, '');

    // Add leading hash if missing
    if (!color.startsWith('#')) {
      color = `#${color}`;
    }

    // Normalize to uppercase and remove extra characters
    color = color.substring(0, 7);
    color = color.toUpperCase();

    // Set color if it is a valid hex color
    if (color.length === 4) {
      this.color.set(color);
      this.isValid.set(true);
    } else if (color.length === 7) {
      this.color.set(color);
      this.isValid.set(true);
    } else {
      this.isValid.set(false);
    }

    this._hexInput().nativeElement.value = color;
  }
}
