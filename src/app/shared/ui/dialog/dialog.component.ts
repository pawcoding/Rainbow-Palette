import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, skip } from 'rxjs';
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
  private readonly _translate = inject(TranslateService);

  /**
   * Label for confirm button.
   */
  protected get confirmLabel(): string {
    if (this.config.type === 'alert') {
      return 'common.ok';
    }

    return this.config.confirmLabel;
  }

  /**
   * Input control for prompt dialog.
   */
  protected readonly input = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  /**
   * Subject that emits true if input is invalid after the first change.
   */
  readonly #invalid$ = this.input.valueChanges.pipe(
    // Skip the first value since it's the initial value
    skip(1),
    // Check if input is invalid
    map(() => this.input.invalid)
  );

  /**
   * Signal containing the invalid state of the input.
   */
  protected readonly invalid = toSignal(this.#invalid$, { initialValue: false });

  /**
   * Signal containing the validation error message.
   */
  protected readonly validationError = toSignal<string, string>(
    this.#invalid$.pipe(
      map((invalid) => {
        // Check if input is valid or dialog is not prompt
        if (!invalid || this.config.type !== 'prompt') {
          return '';
        }

        // Use default error message if no custom validation is set
        if (!this.config.validation) {
          return this._translate.instant('common.required');
        }

        // Find the first error key
        const errorKey = Object.keys(this.config.validation.errorMessageKeys).find((key) => this.input.hasError(key));
        if (!errorKey) {
          return '';
        }

        // Get the error message
        const error = this.input.getError(errorKey);
        return this._translate.instant(this.config.validation.errorMessageKeys[errorKey], { value: error.value });
      })
    ),
    {
      initialValue: ''
    }
  );

  public constructor() {
    if (this.config.type === 'prompt') {
      // Set validators to input
      if (this.config.validation) {
        this.input.setValidators(this.config.validation.validators);
      }

      // Set initial value to input
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
