import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { simpleDiscord, simpleGithub, simpleInstagram, simpleX, simpleYoutube } from '@ng-icons/simple-icons';
import { TranslateModule } from '@ngx-translate/core';
import { VersionService } from '../../../shared/data-access/version.service';

@Component({
  selector: 'rp-layout-footer',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, RouterLink],
  templateUrl: './layout-footer.component.html'
})
export class LayoutFooterComponent {
  private readonly _versionService = inject(VersionService);

  public readonly logoAsset = input.required<string>();

  protected readonly simpleDiscord = simpleDiscord;
  protected readonly simpleGithub = simpleGithub;
  protected readonly simpleInstagram = simpleInstagram;
  protected readonly simpleX = simpleX;
  protected readonly simpleYoutube = simpleYoutube;

  protected readonly version = this._versionService.appVersion;
}
