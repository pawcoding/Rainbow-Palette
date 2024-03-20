import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Value } from '../model';
import { Shade } from '../model/shade.model';
import { ColorNameService } from './color-name.service';
import { ToastService, ToastServiceMock } from './toast.service';

const testColorDictionary = `name;hue;saturation;luminosity
Black;-1;0;0
White;-1;0;100
Blue;190;100;34`;

describe('ColorNameService', () => {
  let toastService: ToastServiceMock;
  let http: HttpTestingController;

  let service: ColorNameService;

  beforeEach(() => {
    toastService = new ToastServiceMock();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ToastService,
          useValue: toastService
        }
      ]
    });

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ColorNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return color name', async () => {
    const colorNamePromise = service.getColorName(
      new Shade(-1, new Value('#FFFFFF'))
    );

    http.expectOne('/assets/color-dictionary.csv').flush(testColorDictionary);

    const colorName = await colorNamePromise;

    expect(colorName).toBe('White');
  });

  it('should handle offline', async () => {
    spyOn(toastService, 'showToast');

    const colorNamePromise = service.getColorName(
      new Shade(-1, new Value('#FFFFFF'))
    );

    http
      .expectOne('/assets/color-dictionary.csv')
      .error(new ProgressEvent('offline'));

    const colorName = await colorNamePromise;

    expect(colorName).toBe('FFFFFF');
    expect(toastService.showToast).toHaveBeenCalled();
  });
});
