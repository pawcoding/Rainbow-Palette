import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Palette} from "../../models/palette.model";
import {ToUnicodeVariantUtil} from "../../utils/to-unicode-variant.util";
import {Color} from "../../models/color.model";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";
import {ExportNotification} from "../../notifications/export.notification";

@Component({
  selector: 'palette-viewer',
  templateUrl: './palette-viewer.component.html',
})
export class PaletteViewerComponent implements OnInit {

  @Input()
  palette: Palette

  @Input()
  dark = false

  @Output()
  onRemove = new EventEmitter<Event>()

  editingState = false

  @ViewChild('editTitle')
  editTitle: ElementRef<HTMLInputElement> | undefined

  constructor(
    private storage: StorageService,
    private notificationService: NotificationService
  ) {
    this.palette = Palette.generateRandomPalette(5)
  }

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
      message: `Are you sure you want to delete the palette?\nIt can ${ToUnicodeVariantUtil.toUnicodeVariant('not', 'bs')} be restored.`,
      actions: [{
        text: 'Cancel',
        title: 'Cancel deletion',
        action: closeEmitter
      }, {
        text: 'Delete',
        title: 'Delete palette',
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
    if (this.palette.removeColor(color))
      this.savePalette()
  }

  /**
   * Add a random color to the palette.
   */
  addRandomColor() {
    this.palette.addColor(Color.generateRandomColor(), false)
  }

  /**
   * Save current palette to local storage.
   */
  savePalette() {
    this.storage.savePalette(this.palette)
    this.notificationService.notification.emit({
      message: 'Palette saved',
      actions: []
    })
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
   * Close editor for palette name and save the palette to local storage.
   */
  closeEditor() {
    this.editingState = false
    this.palette.title = this.editTitle?.nativeElement.value || 'Random'
    this.savePalette()
  }

  /**
   * Trigger palette sorting.
   */
  sortPalette() {
    this.palette.sortColors()
    this.notificationService.notification.emit({
      message: 'Palette sorted',
      actions: []
    })
  }

  /**
   * Export a palette for download and usage as plain CSS or Tailwind config.
   */
  exportPalette() {
    this.notificationService.dialog
      .emit(new ExportNotification(
        this.notificationService.dialog,
        this.palette
      ).getNotification())
  }

}
