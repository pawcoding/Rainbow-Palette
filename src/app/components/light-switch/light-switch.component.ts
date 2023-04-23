import { Component, Input } from '@angular/core'
import { StorageService } from '../../services/storage.service'
import { MatomoTracker } from '@ngx-matomo/tracker'

@Component({
  selector: 'app-light-switch',
  templateUrl: './light-switch.component.html',
})
export class LightSwitchComponent {
  @Input()
  dark: boolean | undefined

  constructor(
    private storage: StorageService,
    private tracker: MatomoTracker
  ) {}

  /**
   * Toggle between light and dark theme.
   */
  toggleTheme(): void {
    this.dark = this.storage.toggleTheme(!this.dark)
    this.tracker.trackPageView()
  }
}
