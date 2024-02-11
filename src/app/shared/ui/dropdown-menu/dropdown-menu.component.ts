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
  ContentChild,
  EventEmitter,
  Output,
  TemplateRef,
  input,
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

  @ContentChild('itemTemplate')
  public itemTemplate!: TemplateRef<unknown>;

  @Output()
  public readonly selectItem = new EventEmitter<T>();

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
}
