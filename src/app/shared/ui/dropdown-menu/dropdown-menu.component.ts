import {
  CdkMenu,
  CdkMenuGroup,
  CdkMenuItemRadio,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  TemplateRef,
  contentChild,
  input,
  model,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-dropdown-menu',
  standalone: true,
  imports: [
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemRadio,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent<T> {
  public readonly items = input.required<Array<T>>();
  public readonly title = input<string | undefined>();

  public itemTemplate =
    contentChild.required<TemplateRef<{ item: T }>>('itemTemplate');

  public readonly selectedItem = model<T | undefined>(undefined);

  protected readonly menuPositions: Array<ConnectedPosition> = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ];

  protected select(item: T): void {
    this.selectedItem.set(item);
  }
}
