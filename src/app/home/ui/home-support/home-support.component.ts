import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroChevronDown, heroPlus } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionComponent } from '../../../shared/ui/accordion/accordion.component';

@Component({
  selector: 'rp-home-support',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, AccordionComponent],
  templateUrl: './home-support.component.html'
})
export class HomeSupportComponent {
  protected readonly heroChevronDown = heroChevronDown;
  protected readonly heroPlus = heroPlus;

  protected readonly githubLink = `<a
    class="transition hover:text-neutral-700/75 dark:hover:text-neutral-50/75 underline"
    href="https://github.com/pawcoding/Rainbow-Palette"
    rel="noreferrer"
    target="_blank"
  >
    GitHub
  </a>`;
  protected readonly discordLink = `<a
    class="transition hover:text-neutral-700/75 dark:hover:text-neutral-50/75 underline"
    href="https://discord.gg/GzgTh4hxrx"
    rel="noreferrer"
    target="_blank"
  >
    Discord
  </a>`;

  protected readonly roadmapFeatures = [15, 17, 18, 19, 22];
}
