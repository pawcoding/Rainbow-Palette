import { TestBed } from '@angular/core/testing';
import { Color } from '../model/color.model';
import { Shade } from '../model/shade.model';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ColorNameService,
          useValue: new ColorNameServiceMock(),
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

    const color = await service.randomColor();

    expect(color).toBeTruthy();
    expect(service.regenerateShades).toHaveBeenCalledTimes(1);
  });

  it('should generate 10 shades', () => {
    const color = new Color([Shade.random()], 'TestColor');

    service.regenerateShades(color);

    expect(color.shades.length).toBe(10);
  });
});
