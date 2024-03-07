import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgIconComponent } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-accordion',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './accordion.component.html',
  styles: ':host { display: block; }',
})
export class AccordionComponent {
  public readonly summary = input.required<string>();
  public readonly details = input<string | SafeHtml | undefined>();

  protected readonly heroPlus = heroPlus;

  private readonly _details =
    viewChild.required<ElementRef<HTMLDetailsElement>>('detailsElement');
  private readonly _summary =
    viewChild.required<ElementRef<HTMLElement>>('summaryElement');
  private readonly _content =
    viewChild.required<ElementRef<HTMLDivElement>>('contentElement');

  protected readonly isOpen = signal(false);

  private _animation?: Animation;
  private _isClosing = false;
  private _isExpanding = false;

  public toggleAccordion($event: MouseEvent) {
    const htmlElement = $event.target as HTMLElement | null;
    if (htmlElement?.tagName === 'A') {
      return;
    }

    $event.preventDefault();

    this._details().nativeElement.style.overflow = 'hidden';

    if (this._isClosing || !this._details().nativeElement.open) {
      this.open();
    } else if (this._isExpanding || this._details().nativeElement.open) {
      this.shrink();
    }
  }

  public shrink() {
    this._isClosing = true;

    const startHeight = `${this._details().nativeElement.offsetHeight}px`;
    const endHeight = `calc(${
      this._summary().nativeElement.offsetHeight
    }px + 3rem)`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this._details().nativeElement.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: 'ease-in-out',
      }
    );

    this._animation.onfinish = () => this.onAnimationFinish(false);
    this._animation.oncancel = () => (this._isClosing = false);

    this.isOpen.set(false);
  }

  public open() {
    this._details().nativeElement.style.height = `${
      this._details().nativeElement.offsetHeight
    }px`;

    this._details().nativeElement.open = true;

    window.requestAnimationFrame(() => this.expand());
  }

  public expand() {
    this._isExpanding = true;

    const startHeight = `${this._details().nativeElement.offsetHeight}px`;
    const endHeight = `calc(${
      this._summary().nativeElement.offsetHeight +
      this._content().nativeElement.offsetHeight
    }px + 4rem)`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this._details().nativeElement.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: 'ease-in-out',
      }
    );

    this._animation.onfinish = () => this.onAnimationFinish(true);
    this._animation.oncancel = () => (this._isExpanding = false);

    this.isOpen.set(true);
  }

  public onAnimationFinish(open: boolean) {
    this._details().nativeElement.open = open;

    this._animation = undefined;

    this._isClosing = false;
    this._isExpanding = false;

    this._details().nativeElement.style.height = '';
    this._details().nativeElement.style.overflow = '';
  }
}
