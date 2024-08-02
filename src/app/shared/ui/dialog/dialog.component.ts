import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogConfig } from '../../types/dialog-config';

@Component({
  selector: 'rp-dialog',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  public readonly config = input.required<DialogConfig>();

  protected readonly type = computed(() => this.config().type);
  protected readonly title = computed(() => this.config().title);
  protected readonly message = computed(() => this.config().message);
  protected readonly confirmLabel = computed(() => {
    const config = this.config();
    if (config.type === 'alert') {
      return 'common.ok';
    }

    return config.confirmLabel;
  });

  protected readonly input = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  public constructor() {
    effect(() => {
      const config = this.config();
      if (config.type === 'prompt') {
        this.input.setValue(config.initialValue ?? '');
      }
    });
  }

  protected dismiss(): void {}
  protected confirm(): void {}
}
