import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
  untracked,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowUturnLeft } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, fromEvent, merge, tap } from 'rxjs';
import { LanguageService } from '../../data-access/language.service';
import { MobileService } from '../../data-access/mobile.service';
import { sleep } from '../../utils/sleep';

@Component({
  selector: 'rp-no-palette',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, RouterLink],
  templateUrl: './no-palette.component.html',
  styleUrl: './no-palette.component.css'
})
export class NoPaletteComponent implements AfterViewInit, OnDestroy {
  readonly #mobileService = inject(MobileService);
  readonly #languageService = inject(LanguageService);

  protected readonly heroArrowUturnLeft = heroArrowUturnLeft;

  /**
   * The parent component of the no-palette component.
   * This determines the text that is displayed in the no-palette component.
   */
  public readonly parent = input.required<'view' | 'palette' | 'preview'>();

  /**
   * Container of the "no palette" element
   */
  public readonly container = viewChild.required<ElementRef<HTMLElement>>('container');

  /**
   * "no palette" element
   */
  public readonly child = viewChild.required<ElementRef<HTMLElement>>('child');

  readonly #language$ = toObservable(this.#languageService.language);

  /**
   * Flag indicating if the child should be animated
   */
  readonly #animation = signal(false);

  /**
   * Timeout until the next position must be animated
   */
  #animationTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

  public constructor() {
    // Listen to the "resize" event and language change to restart the animation
    merge(fromEvent(window, 'resize'), this.#language$)
      .pipe(
        takeUntilDestroyed(),
        // Abort the current animation
        tap(() => this.#animation.set(false)),
        // Clear the next animation position timer
        tap(() => {
          if (this.#animationTimeout) {
            clearTimeout(this.#animationTimeout);
            this.#animationTimeout = undefined;
          }
        }),
        // Wait for resize to be done
        debounceTime(5000)
      )
      .subscribe(() => {
        // Restart animation
        this.#animation.set(true);
      });

    effect(async () => {
      // Abort if container and child are not defined yet
      let container: ElementRef<HTMLElement> | HTMLElement = this.container();
      let child: ElementRef<HTMLElement> | HTMLElement = this.child();
      if (!child || !container) {
        return;
      }

      container = container.nativeElement;
      child = child.nativeElement;

      // Get bounding boxes for container and child
      const containerRect = container.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();

      // Do not animate on mobile devices due to size constraints
      if (this.#mobileService.isMobile()) {
        child.style.transition = '';
        child.style.left = '';
        child.style.top = '';
        child.style.transform = 'translate(0, 0)';

        return;
      }

      // Animation is not running, reset element
      if (!this.#animation()) {
        child.style.transition = '';
        child.style.left = '50%';
        child.style.top = '50%';
        child.style.transform = 'translate(-50%, -50%)';

        return;
      }

      // Get current position
      let left = childRect.left;
      let top = childRect.top - containerRect.top;

      // Set current position without translation as a starting point
      // This is done to only animate left and top and the translation can be ignored
      child.style.left = left + 'px';
      child.style.top = top + 'px';
      child.style.transform = 'translate(0, 0)';

      await sleep(1);

      // Calculate the space for the top left corner to move inside
      const containerSize = {
        height: containerRect.height - childRect.height,
        width: containerRect.width - childRect.width
      };

      untracked(async () => {
        // Use a random angle to start
        const initialAngle = Math.random() * 360;

        // Calculate initial velocity in each direction
        let velX = Math.cos(initialAngle);
        let velY = Math.sin(initialAngle);

        // Calculate each frame for the animation
        while (this.#animation()) {
          // Get the distance to the border of the parent space on each axis
          // This already uses the current velocity
          const distXBorder = velX > 0 ? (containerSize.width - left) / velX : (0 - left) / velX;
          const distYBorder = velY > 0 ? (containerSize.height - top) / velY : (0 - top) / velY;

          // Calculate the distance until the nearest border is hit
          const minDist = Math.min(distXBorder, distYBorder);

          // Calculate new position for the next frame
          const nextLeft = left + velX * minDist;
          const nextTop = top + velY * minDist;

          // Calculate actual distance for animation
          const distX = Math.abs(nextLeft - left);
          const distY = Math.abs(nextTop - top);

          // Calculate time for animation
          const time = Math.sqrt(distX * distX + distY * distY) * 10;

          // Calculate new position for the next frame
          left = nextLeft;
          top = nextTop;

          // Animate the element to the next position
          child.style.transition = `left ${Math.ceil(time)}ms linear, top ${Math.ceil(time)}ms linear`;
          child.style.left = left + 'px';
          child.style.top = top + 'px';

          // Wait until the next border is reached and the CSS animation is finished
          let animationTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
          await new Promise((resolve) => {
            animationTimeout = setTimeout(resolve, Math.floor(time));
            this.#animationTimeout = animationTimeout;
          });

          // Timeout was cleared or changed, abort the current animation
          if (this.#animationTimeout !== animationTimeout) {
            break;
          }

          // Invert the velocity of the current axis that hit the border
          if (distXBorder < distYBorder) {
            velX *= -1;
          } else {
            velY *= -1;
          }
        }
      });
    });
  }

  public async ngAfterViewInit(): Promise<void> {
    // Wait for 10s to start the animation
    await sleep(10_000);

    // Start the animation
    this.#animation.set(true);
  }

  public ngOnDestroy(): void {
    if (this.#animationTimeout) {
      clearTimeout(this.#animationTimeout);
      this.#animationTimeout = undefined;
    }
  }
}
