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

  removePalette($event: MouseEvent) {
    if (confirm(`Are you sure you want to delete the palette?\nIt can ${ToUnicodeVariantUtil.toUnicodeVariant('not', 'bs')} be restored.`))
      this.onRemove.emit($event)
  }

  removeColor(color: Color) {
    this.palette?.removeColor(color)
    this.savePalette()
  }

  savePalette() {
    if (this.palette)
      this.storage.savePalette(this.palette)
  }

  openEditor() {
    this.editingState = true
    setTimeout(() => {
      console.info(this.editTitle)
      this.editTitle?.nativeElement.focus()
    }, 0)
  }

  closeEditor() {
    this.editingState = false
    if (this.palette)
      this.palette.title = this.editTitle?.nativeElement.value || 'Random'
    this.savePalette()
  }

  sortPalette() {
    this.palette?.sortColors()
  }

}
