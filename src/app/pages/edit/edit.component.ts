import { Component, inject } from '@angular/core'
import { PaletteService } from '../../services/palette.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent {
  private readonly _paletteService = inject(PaletteService)

  protected readonly palette = this._paletteService.palette
}
