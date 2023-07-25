import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core'
import { Palette } from '../../models/palette.model'
import { Color } from '../../models/color.model'
import { StorageService } from '../../services/storage.service'
import { NotificationService } from '../../services/notification.service'
import { TranslateService } from '@ngx-translate/core'
import { MatomoTracker } from 'ngx-matomo-client'
import { ExportDialog } from '../../dialogs/export.dialog'
import { DialogService } from 'src/app/services/dialog.service'

@Component({
  selector: 'app-palette-viewer',
  templateUrl: './palette-viewer.component.html',
})
export class PaletteViewerComponent {
  private readonly _translate = inject(TranslateService)
  private readonly _storage = inject(StorageService)
  private readonly _notificationService = inject(NotificationService)
  private readonly _dialogService = inject(DialogService)
  private readonly _tracker = inject(MatomoTracker)

  @Input()
  public palette: Palette | undefined

  @Input()
  public dark = false

  @Output()
  public onRemove = new EventEmitter<Event>()

  protected editingState = false
  protected saving = false
  protected adding = false

  @ViewChild('editTitle')
  editTitle: ElementRef<HTMLInputElement> | undefined

  /**
   * Ask user for confirmation an trigger onRemove event handler.
   * @param $event MouseEvent
   */
  protected removePalette($event: MouseEvent) {
    this._dialogService.openDialog({
      id: 'delete-palette',
      actions: [
        {
          id: 'cancel',
        },
        {
          id: 'delete',
          callback: async () => {
            this.onRemove.emit($event)
            return undefined
          },
        },
      ],
    })
  }

  /**
   * Remove color from palette and save the current palette to local storage.
   * If color is not present in palette nothing happens.
   * @param color Color to remove from palette
   */
  protected removeColor(color: Color) {
    this.palette?.removeColor(color)
  }

  /**
   * Add a random color to the palette.
   */
  protected addRandomColor($event: MouseEvent) {
    const target = $event.target as HTMLButtonElement
    this.adding = true
    setTimeout(() => {
      this.palette?.addColor(Color.generateRandomColor(), false)
      this.adding = false
      setTimeout(() => {
        window.scroll({
          behavior: 'smooth',
          top:
            window.scrollY +
            target.getBoundingClientRect().bottom -
            window.innerHeight +
            20,
        })
      }, 10)
    }, 2000)
  }

  /**
   * Save current palette to local storage.
   */
  protected savePalette() {
    this.saving = true

    if (this.palette) {
      this._storage.savePalette(this.palette)
      this._tracker.trackEvent('palette', 'save')
    }

    setTimeout(() => {
      this._notificationService.openNotification('saved')
      this.saving = false
    }, 2000)
  }

  /**
   * Open editor for palette name.
   */
  protected openEditor() {
    this.editingState = true
    setTimeout(() => {
      this.editTitle?.nativeElement.focus()
    }, 0)
  }

  /**
   * Close editor for palette name.
   */
  protected closeEditor() {
    this.editingState = false
    if (this.palette)
      this.palette.title =
        this.editTitle?.nativeElement.value || this._translate.instant('random')
  }

  /**
   * Export a palette for download and usage as plain CSS or Tailwind config.
   */
  protected exportPalette() {
    if (this.palette) {
      this._dialogService.openDialog(
        new ExportDialog(this.palette).getNotification()
      )
    }
  }
}
