import { Component, Input } from '@angular/core'
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-light-switch',
  templateUrl: './light-switch.component.html',
})
export class LightSwitchComponent {
  @Input()
  dark: boolean | undefined

  constructor(private storage: StorageService) {}

  /**
   * Toggle between light and dark theme.
   */
  toggleTheme(): void {
    this.dark = this.storage.toggleTheme(!this.dark)
  }
}
