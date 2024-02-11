import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  simpleDiscord,
  simpleGithub,
  simpleInstagram,
  simpleTwitter,
  simpleYoutube,
} from '@ng-icons/simple-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-layout-footer',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, RouterLink],
  templateUrl: './layout-footer.component.html',
  providers: [
    provideIcons({
      simpleDiscord,
      simpleGithub,
      simpleInstagram,
      simpleTwitter,
      simpleYoutube,
    }),
  ],
})
export class LayoutFooterComponent {
  public readonly logoAsset = input.required<string>();
}
