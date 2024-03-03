import { TestBed } from '@angular/core/testing';
import { Color } from '../model/color.model';
import { Shade } from '../model/shade.model';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let colorNameService: ColorNameServiceMock;
  let service: ColorService;

  beforeEach(() => {
    colorNameService = new ColorNameServiceMock();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ColorNameService,
          useValue: colorNameService,
        },
      ],
    });
    service = TestBed.inject(ColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create random color', async () => {
    spyOn(service, 'regenerateShades');
    spyOn(colorNameService, 'getColorName').and.callThrough();

    const color = await service.randomColor();

    expect(color).toBeTruthy();
    expect(service.regenerateShades).toHaveBeenCalledTimes(1);
    expect(colorNameService.getColorName).toHaveBeenCalledTimes(1);
  });

  it('should generate 10 shades', () => {
    const color = new Color([Shade.random()], 'TestColor');

    service.regenerateShades(color);

    expect(color.shades.length).toBe(10);
  });
});
