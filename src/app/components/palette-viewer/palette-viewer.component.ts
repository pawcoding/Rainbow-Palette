import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Palette} from "../../models/palette.model";
import {toUnicodeVariant} from "../../utils/to-unicode-variant.util";
import {Color} from "../../models/color.model";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";
import {ExportDialog} from "../../dialogs/export.dialog";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'palette-viewer',
  templateUrl: './palette-viewer.component.html',
})
export class PaletteViewerComponent implements OnInit {

  @Input()
  palette: Palette | undefined

  @Input()
  dark = false

  @Output()
  onRemove = new EventEmitter<Event>()

  editingState = false
  saving = false
  adding = false

  @ViewChild('editTitle')
  editTitle: ElementRef<HTMLInputElement> | undefined

  constructor(
    private storage: StorageService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Ask user for confirmation an trigger onRemove event handler.
   * @param $event MouseEvent
   */
  removePalette($event: MouseEvent) {
    const removeEmitter = new EventEmitter()
    removeEmitter.subscribe(() => {
      this.notificationService.dialog.emit(undefined)
      this.onRemove.emit($event)
    })
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notificationService.dialog.emit(undefined)
    })

    this.notificationService.dialog.emit({
      id: 'delete-palette',
      interpolateParams: {
        not: toUnicodeVariant('not', 'bs')
      },
      actions: [{
        id: 'cancel',
        action: closeEmitter
      }, {
        id: 'delete',
        action: removeEmitter
      }]
    })
  }

  /**
   * Remove color from palette and save the current palette to local storage.
   * If color is not present in palette nothing happens.
   * @param color Color to remove from palette
   */
  removeColor(color: Color) {
    this.palette?.removeColor(color)
  }

  /**
   * Add a random color to the palette.
   */
  addRandomColor($event: MouseEvent) {
    const target = ($event.target as HTMLButtonElement)
    this.adding = true
    setTimeout(() => {
      this.palette?.addColor(Color.generateRandomColor(), false)
      this.adding = false
      setTimeout(() => {
        window.scroll({
          behavior: 'smooth',
          top: window.scrollY + target.getBoundingClientRect().bottom - window.innerHeight + 20
        })
      }, 10)
    }, 2000)
  }

  /**
   * Save current palette to local storage.
   */
  savePalette() {
    this.saving = true
    if (this.palette)
      this.storage.savePalette(this.palette)
    setTimeout(() => {
      this.notificationService.notification.emit('saved')
      this.saving = false
    }, 2000)
  }

  /**
   * Open editor for palette name.
   */
  openEditor() {
    this.editingState = true
    setTimeout(() => {
      this.editTitle?.nativeElement.focus()
    }, 0)
  }

  /**
   * Close editor for palette name.
   */
  closeEditor() {
    this.editingState = false
    if (this.palette)
      this.palette.title = this.editTitle?.nativeElement.value || this.translate.instant('random')
  }

  /**
   * Export a palette for download and usage as plain CSS or Tailwind config.
   */
  exportPalette() {
    if (this.palette) {
      this.notificationService.dialog
        .emit(new ExportDialog(
          this.notificationService.dialog,
          this.palette
        ).getNotification())
    }
  }

}
