import { Pipe, PipeTransform, inject } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  private readonly _sanitized = inject(DomSanitizer)

  transform(value: string): SafeHtml {
    return this._sanitized.bypassSecurityTrustHtml(value)
  }
}
