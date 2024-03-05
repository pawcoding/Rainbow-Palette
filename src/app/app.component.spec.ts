import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import {
  PaletteService,
  PaletteServiceMock,
  VersionService,
  VersionServiceMock,
} from './shared/data-access';

describe('AppComponent', () => {
  let paletteService: PaletteServiceMock;

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    paletteService = new PaletteServiceMock();

    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: PaletteService, useValue: paletteService },
        { provide: VersionService, useClass: VersionServiceMock },
      ],
    }).compileComponents();

    spyOn(paletteService, 'loadPaletteFromLocalStorage');

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should load palette on startup', () => {
    expect(paletteService.loadPaletteFromLocalStorage).toHaveBeenCalled();
  });
});
