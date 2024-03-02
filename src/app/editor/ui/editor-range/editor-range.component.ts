import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  model,
  numberAttribute,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { hueToWheel, wheelToHue } from '../../utils/color-wheel';

@Component({
  selector: 'rp-editor-range',
  standalone: true,
  imports: [TranslateModule, DecimalPipe],
  templateUrl: './editor-range.component.html',
  styleUrl: './editor-range.component.css',
})
export class EditorRangeComponent {
  public readonly key = input.required<string>();
  public readonly value = model.required<number>();
  public readonly min = input(0, {
    transform: numberAttribute,
  });
  public readonly max = input(100, {
    transform: numberAttribute,
  });

  protected readonly transformedValue = computed(() => {
    if (this.key() === 'common.hue') {
      return hueToWheel(this.value());
    } else if (this.key() === 'common.lightness') {
      return 100 - this.value();
    } else {
      return this.value();
    }
  });

  protected updateValue(value: number | string) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    if (this.key() === 'common.hue') {
      this.value.set(wheelToHue(value));
    } else if (this.key() === 'common.lightness') {
      this.value.set(100 - value);
    } else {
      this.value.set(value);
    }
  }
}
