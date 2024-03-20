import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowUturnLeft, heroWrenchScrewdriver } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-preview',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, RouterLink],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export default class PreviewComponent {
  protected readonly heroArrowUturnLeft = heroArrowUturnLeft;
  protected readonly heroWrenchScrewdriver = heroWrenchScrewdriver;

  protected readonly links = {
    github: '<a href="https://github.com/pawcoding/Rainbow-Palette" rel="noreferrer" target="_blank">GitHub</a>',
    discord: '<a href="https://discord.gg/GzgTh4hxrx" rel="noreferrer" target="_blank">Discord</a>'
  };
}
