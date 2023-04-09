import { Component } from '@angular/core'
import { getGitHubLink, getDiscordLink } from '../../utils/links.util'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent {
  getGitHubLink = getGitHubLink(this.translate)
  getDiscordLink = getDiscordLink(this.translate)

  constructor(private translate: TranslateService) {}
}
