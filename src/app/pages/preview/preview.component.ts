import { Component, inject } from '@angular/core'
import { getGitHubLink, getDiscordLink } from '../../utils/links.util'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent {
  private readonly _translate = inject(TranslateService)

  protected readonly getGitHubLink = getGitHubLink(this._translate)
  protected readonly getDiscordLink = getDiscordLink(this._translate)
}
