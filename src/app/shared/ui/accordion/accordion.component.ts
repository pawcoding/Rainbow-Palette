import { Component, ElementRef, booleanAttribute, input, signal, viewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgIconComponent } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { sleep } from '../../utils/sleep';

@Component({
  selector: 'rp-accordion',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './accordion.component.html',
  styles: ':host { display: block; }'
})
export class AccordionComponent {
  protected readonly heroPlus = heroPlus;

  /**
   * The summary of the accordion.
   * This can be a translation key or a string.
   */
  public readonly summary = input.required<string>();
  /**
   * The content of the accordion.
   * This can be a translation key, a string or a SafeHtml object.
   * As an alternative, you can project the content into the component instead.
   */
  public readonly details = input<string | SafeHtml | undefined>();
  /**
   * Whether the accordions content should be hidden initially.
   * When set to true, the content will not be rendered into the DOM until the accordion is opened.
   * This can be used to hide content like private information from search engines and automated scrapers.
   */
  public readonly hidden = input(false, { transform: booleanAttribute });

  /**
   * HTML details element reference.
   */
  private readonly _details = viewChild.required<ElementRef<HTMLDetailsElement>>('detailsElement');
  /**
   * HTML summary element reference.
   */
  private readonly _summary = viewChild.required<ElementRef<HTMLElement>>('summaryElement');
  /**
   * Reference to the content container element.
   */
  private readonly _content = viewChild.required<ElementRef<HTMLDivElement>>('contentElement');

  /**
   * Whether the accordion is open.
   */
  protected readonly isOpen = signal(false);

  /**
   * Native animation object for the accordion.
   */
  private _animation?: Animation;
  /**
   * Whether the accordion is currently closing.
   */
  private _isClosing = false;
  /**
   * Whether the accordion is currently expanding.
   */
  private _isExpanding = false;

  /**
   * Toggles the accordion open and closed.
   */
  public toggleAccordion($event: Event): void {
    const htmlElement = $event.target as HTMLElement | null;
    if (htmlElement?.tagName === 'A') {
      return;
    }
    $event.preventDefault();

    if (this._isClosing || !this._details().nativeElement.open) {
      this.open();
    } else if (this._isExpanding || this._details().nativeElement.open) {
      this.shrink();
    }
  }

  /**
   * Shrinks the accordion to close it.
   */
  public async shrink(): Promise<void> {
    this._isClosing = true;

    this._details().nativeElement.style.overflow = 'hidden';
    const startHeight = `${this._details().nativeElement.offsetHeight}px`;
    const endHeight = `calc(${this._summary().nativeElement.offsetHeight}px + 3rem)`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this._details().nativeElement.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 300,
        easing: 'ease-in-out'
      }
    );

    this._animation.onfinish = (): void => this._onAnimationFinish(false);
    this._animation.oncancel = (): boolean => (this._isClosing = false);

    // Wait for animation to finish before hiding the content
    await sleep(300);

    this.isOpen.set(false);
  }

  /**
   * Opens the accordion.
   */
  public open(): void {
    this._details().nativeElement.style.overflow = 'hidden';
    this._details().nativeElement.style.height = `${this._details().nativeElement.offsetHeight}px`;

    this._details().nativeElement.open = true;

    window.requestAnimationFrame(() => this._expand());
  }

  /**
   * Expands the accordion to open it.
   */
  private async _expand(): Promise<void> {
    this._isExpanding = true;
    this.isOpen.set(true);

    // Wait for the next frame to ensure the content is rendered
    await sleep(1);

    const startHeight = `${this._details().nativeElement.offsetHeight}px`;
    const endHeight = `calc(${
      this._summary().nativeElement.offsetHeight + this._content().nativeElement.offsetHeight
    }px + 4rem)`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this._details().nativeElement.animate(
      {
        height: [startHeight, endHeight]
      },
      {
        duration: 300,
        easing: 'ease-in'
      }
    );

    this._animation.onfinish = (): void => this._onAnimationFinish(true);
    this._animation.oncancel = (): boolean => (this._isExpanding = false);
  }

  /**
   * Handles the finish of the animation and updates the state of the accordion.
   *
   * @param open Whether the accordion is open.
   */
  private _onAnimationFinish(open: boolean): void {
    this._details().nativeElement.open = open;

    this._animation = undefined;

    this._isClosing = false;
    this._isExpanding = false;

    this._details().nativeElement.style.height = '';
    this._details().nativeElement.style.overflow = '';
  }
}
