import { TranslateService } from '@ngx-translate/core'

export function getGitHubLink(translate: TranslateService): () => string {
  return () =>
    `<a href="https://github.com/pawcoding/rainbow-palette" target="_blank" rel="noreferrer noopener" class="underline" title="${translate.instant(
      'app.footer.source-code'
    )}">GitHub</a>`
}

export function getDiscordLink(translate: TranslateService): () => string {
  return () =>
    `<a href="https://discord.gg/GzgTh4hxrx" target="_blank" rel="noreferrer noopener" class="underline" title="${translate.instant(
      'home.additions.development.discord'
    )}">Discord</a>`
}

export function getMatomoLink(translate: TranslateService): () => string {
  return () =>
    `<a href="https://matomo.org/" target="_blank" rel="noreferrer noopener" class="underline" title="${translate.instant(
      'app.analytics.matomo-link'
    )}">Matomo</a>`
}
