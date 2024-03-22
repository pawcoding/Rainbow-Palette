import { HttpClient, provideHttpClient } from '@angular/common/http';
import { LOCALE_ID, NgModule, inject } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'en' }],
  exports: [TranslateModule]
})
export class StorybookTranslateModule {
  private readonly _translateService = inject(TranslateService);

  public constructor() {
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
  }
}
