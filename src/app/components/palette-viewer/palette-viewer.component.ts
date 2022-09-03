import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Palette} from "../../models/palette.model";
import {ToUnicodeVariantUtil} from "../../utils/to-unicode-variant.util";
import {Color} from "../../models/color.model";
import {StorageService} from "../../services/storage.service";

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

  @ViewChild('editTitle')
  editTitle: ElementRef<HTMLInputElement> | undefined

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Ask user for confirmation an trigger onRemove event handler.
   * @param $event MouseEvent
   */
  removePalette($event: MouseEvent) {
    if (confirm(`Are you sure you want to delete the palette?\nIt can ${ToUnicodeVariantUtil.toUnicodeVariant('not', 'bs')} be restored.`))
      this.onRemove.emit($event)
  }

  /**
   * Remove color from palette and save the current palette to local storage.
   * If color is not present in palette nothing happens.
   * @param color Color to remove from palette
   */
  removeColor(color: Color) {
    if (this.palette?.removeColor(color))
      this.savePalette()
  }

  /**
   * Save current palette to local storage.
   */
  savePalette() {
    if (this.palette)
      this.storage.savePalette(this.palette)
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
    if (this.palette)
      this.palette.title = this.editTitle?.nativeElement.value || 'Random'
    this.savePalette()
  }

  /**
   * Trigger palette sorting.
   */
  sortPalette() {
    this.palette?.sortColors()
  }

}
