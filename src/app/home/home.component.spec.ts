import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AnalyticsService, AnalyticsServiceMock } from '../shared/data-access/analytics.service';
import { PaletteService, PaletteServiceMock } from '../shared/data-access/palette.service';
import { HomeService, HomeServiceMock } from './data-access/home.service';
import HomeComponent from './home.component';

describe('HomeComponent', () => {
  let homeService: HomeServiceMock;
  let paletteService: PaletteServiceMock;
  let analyticsService: AnalyticsServiceMock;
  const router = jasmine.createSpyObj('Router', ['navigate']);

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    homeService = new HomeServiceMock();
    paletteService = new PaletteServiceMock();
    analyticsService = new AnalyticsServiceMock();

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        { provide: HomeService, useValue: homeService },
        { provide: PaletteService, useValue: paletteService },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save generation settings on palette generation', async () => {
    spyOn(homeService, 'saveGenerationSettings');

    await component.generatePalette();

    expect(homeService.saveGenerationSettings).toHaveBeenCalled();
  });

  it('should generate palette on palette generation', async () => {
    spyOn(paletteService, 'generatePalette');

    await component.generatePalette();

    expect(paletteService.generatePalette).toHaveBeenCalledWith(homeService.hex(), homeService.scheme());
  });

  it('should track palette generation on palette generation', async () => {
    spyOn(analyticsService, 'trackPaletteGeneration');

    await component.generatePalette();

    expect(analyticsService.trackPaletteGeneration).toHaveBeenCalled();
  });

  it('should navigate to view on palette generation', async () => {
    await component.generatePalette();

    expect(router.navigate).toHaveBeenCalledWith(['/view', 'test-id'], { info: { palette: 'new' } });
  });
});
