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
  ElementRef,
  TemplateRef,
  booleanAttribute,
  contentChild,
  effect,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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
  // Input Signals
  public readonly items = input.required<Array<T>>();
  public readonly title = input<string | undefined>();
  public readonly disabled = input(false, {
    transform: booleanAttribute,
  });
  public readonly closeOnScroll = input(true, {
    transform: booleanAttribute,
  });
  public readonly minWidth = input('12rem');
  public readonly maxWidth = input('40rem');
  public readonly minHeight = input<string | undefined>();
  public readonly maxHeight = input('16rem');

  // Model Signals
  public readonly selectedItem = model<T | undefined>(undefined);

  // Content Signals
  public readonly itemTemplate =
    contentChild<TemplateRef<{ item: T }>>('itemTemplate');

  // View Child Signals
  private readonly _trigger = viewChild(CdkMenuTrigger);
  private readonly _menu = viewChild<ElementRef<HTMLElement>>('menuGroup');

  // Internal Signals and Properties
  private readonly _isOpen = signal(false);
  private readonly _abortControllers: Array<AbortController> = [];
  private _openedSubscription?: Subscription;
  private _closedSubscription?: Subscription;

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

  constructor() {
    /**
     * Effect to handle the opened and closed subscriptions of the trigger.
     * These subscriptions are used to update the isOpen signal when the
     * menu is opened or closed.
     */
    effect(() => {
      if (this._openedSubscription) {
        this._openedSubscription.unsubscribe();
      }
      if (this._closedSubscription) {
        this._closedSubscription.unsubscribe();
      }

      if (this._trigger()) {
        this._openedSubscription = this._trigger()!.opened.subscribe(() => {
          this._isOpen.set(true);
        });
        this._closedSubscription = this._trigger()!.closed.subscribe(() => {
          this._isOpen.set(false);
        });
      }
    });

    /**
     * Effect to handle closing the menu when the user scrolls outside of the menu.
     * This effect will add an event listener to the window scroll event when the
     * menu is open (and {@link closeOnScroll} is true).
     * These event listeners are also automatically removed when the menu is closed again.
     */
    effect(() => {
      if (this._isOpen()) {
        if (!this.closeOnScroll()) {
          return;
        }

        const abortController = new AbortController();
        this._abortControllers.push(abortController);

        window.addEventListener(
          'scroll',
          (event: Event) => {
            if (event.target === this._menu()?.nativeElement) {
              return;
            }

            this._trigger()?.close();
          },
          {
            capture: true,
            signal: abortController.signal,
          }
        );
      } else {
        while (this._abortControllers.length > 0) {
          this._abortControllers.shift()?.abort();
        }
      }
    });
  }

  protected select(item: T): void {
    this.selectedItem.set(item);
  }
}
