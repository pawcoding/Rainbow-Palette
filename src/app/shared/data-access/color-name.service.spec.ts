import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ColorTranslator } from 'colortranslator';
import { of } from 'rxjs';
import { Shade } from '../model/shade.model';
import { ColorNameService } from './color-name.service';

const testColorDictionary = `name;hue;saturation;luminosity
Black;-1;0;0
White;-1;0;100
Blue;190;100;34`;

describe('ColorNameService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ColorNameService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    service = TestBed.inject(ColorNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return color name', async () => {
    httpClientSpy.get.and.returnValue(of(testColorDictionary));

    const colorName = await service.getColorName(
      new Shade(-1, new ColorTranslator('#FFFFFF', { decimals: 2 }))
    );

    expect(colorName).toBe('White');
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should handle offline', async () => {
    httpClientSpy.get.and.returnValue(of(null));

    const colorName = await service.getColorName(
      new Shade(-1, new ColorTranslator('#FFFFFF', { decimals: 2 }))
    );

    expect(colorName).toBe('FFFFFF');
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
