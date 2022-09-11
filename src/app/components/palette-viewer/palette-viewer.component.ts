import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Palette} from "../../models/palette.model";
import {ToUnicodeVariantUtil} from "../../utils/to-unicode-variant.util";
import {Color} from "../../models/color.model";
import {StorageService} from "../../services/storage.service";
import {PaletteExporter} from "../../class/palette-exporter";

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
    private storage: StorageService
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
    if (confirm(`Are you sure you want to delete the palette?\nIt can ${ToUnicodeVariantUtil.toUnicodeVariant('not', 'bs')} be restored.`))
      this.onRemove.emit($event)
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
    this.palette.addColor(Color.generateRandomColor())
  }

  /**
   * Save current palette to local storage.
   */
  savePalette() {
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
    this.palette.sortColors()
  }

  /**
   * Export a palette for download and usage as plain CSS or Tailwind config.
   */
  exportPalette() {
    if (this.palette) {
      // TODO: Switch between css and tailwind export
      // TODO: Switch between clipboard and file export when using css
      const css = PaletteExporter.exportPaletteToCSS(this.palette)
      navigator.clipboard.writeText(css).then(() => {
        alert(`${ToUnicodeVariantUtil.toUnicodeVariant('CSS copied to clipboard', 'bs')}\nOpen your main .css file and paste the palette at the top.`)
      }).catch(e => {
        console.error('Error while copying to clipboard', e)
      })
      //console.info(PaletteExporter.exportPaletteToTailwind(this.palette))
    }
  }

}
