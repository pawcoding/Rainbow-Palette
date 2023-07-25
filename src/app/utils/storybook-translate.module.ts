import { NgModule, inject } from '@angular/core'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class StorybookTranslateModule {
  private readonly _translate = inject(TranslateService)

  constructor() {
    this._translate.setDefaultLang('en')
    this._translate.use(this._translate.getBrowserLang() ?? 'en')
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http)
}
