import { Component, Input, inject } from '@angular/core'
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-light-switch',
  templateUrl: './light-switch.component.html',
})
export class LightSwitchComponent {
  private readonly _storage = inject(StorageService)

  @Input()
  dark = false

  /**
   * Toggle between light and dark theme.
   */
  protected toggleTheme(): void {
    this.dark = this._storage.toggleTheme(!this.dark)
  }
}
