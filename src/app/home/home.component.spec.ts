import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  PaletteService,
  PaletteServiceMock,
} from '../shared/data-access/palette.service';
import { HomeService, HomeServiceMock } from './data-access/home.service';
import HomeComponent from './home.component';

describe('HomeComponent', () => {
  let homeService: HomeServiceMock;
  let paletteService: PaletteServiceMock;
  let router = jasmine.createSpyObj('Router', ['navigate']);

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    homeService = new HomeServiceMock();
    paletteService = new PaletteServiceMock();

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        { provide: HomeService, useValue: homeService },
        { provide: PaletteService, useValue: paletteService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save generation settings on palette generation', () => {
    spyOn(homeService, 'saveGenerationSettings');

    component.generatePalette();

    expect(homeService.saveGenerationSettings).toHaveBeenCalled();
  });

  it('should generate palette on palette generation', () => {
    spyOn(paletteService, 'generatePalette');

    component.generatePalette();

    expect(paletteService.generatePalette).toHaveBeenCalledWith(
      homeService.hex(),
      homeService.scheme()
    );
  });

  it('should navigate to view on palette generation', async () => {
    await component.generatePalette();

    expect(router.navigate).toHaveBeenCalledWith(['/view']);
  });
});
