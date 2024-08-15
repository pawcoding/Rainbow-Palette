import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  protected readonly config = inject<DialogConfig>(DIALOG_DATA);
  private readonly _dialogRef = inject(DialogRef);

  protected get confirmLabel(): string {
    if (this.config.type === 'alert') {
      return 'common.ok';
    }

    return this.config.confirmLabel;
  }

  protected readonly input = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  public constructor() {
    if (this.config.type === 'prompt') {
      this.input.setValue(this.config.initialValue ?? '');
    }
  }

  public dismiss(): void {
    this._dialogRef.close();
  }

  public confirm(): void {
    // Close alert without any action
    if (this.config.type === 'alert') {
      this._dialogRef.close();
      return;
    }

    // Close confirm dialog with true
    if (this.config.type === 'confirm') {
      this._dialogRef.close(true);
      return;
    }

    // Check if input was not changed in prompt dialog
    if (this.input.value === this.config.initialValue) {
      this._dialogRef.close();
      return;
    }

    // Check if input is invalid in prompt dialog
    if (this.input.invalid) {
      return;
    }

    // Close prompt dialog with input value
    this._dialogRef.close(this.input.value);
  }
}
