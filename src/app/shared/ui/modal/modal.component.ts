import {
  Component,
  booleanAttribute,
  input,
  signal
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroXMarkMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-modal',
  imports: [TranslateModule, NgIconComponent],
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  public readonly title = input<string | undefined>();
  public readonly closeable = input(true, { transform: booleanAttribute });
  public readonly minWidth = input<string | undefined>();
  public readonly maxWidth = input<string | undefined>();
  public readonly minHeight = input<string | undefined>();
  public readonly maxHeight = input<string | undefined>();

  protected readonly heroXMarkMini = heroXMarkMini;

  protected readonly isOpen = signal(false);

  public open(): void {
    console.log('open');
    this.isOpen.set(true);
  }

  public close(): void {
    console.log('close');
    this.isOpen.set(false);
  }
}
