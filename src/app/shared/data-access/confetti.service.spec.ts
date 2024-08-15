import { TestBed } from '@angular/core/testing';
import { ConfettiService } from './confetti.service';
import { PaletteService, PaletteServiceMock } from './palette.service';

describe('ConfettiService', () => {
  let service: ConfettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PaletteService,
          useClass: PaletteServiceMock
        }
      ]
    });
    service = TestBed.inject(ConfettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
