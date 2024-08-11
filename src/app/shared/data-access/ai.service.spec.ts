import { TestBed } from '@angular/core/testing';
import { IS_RUNNING_TEST } from '../utils/is-running-test';
import { AiService } from './ai.service';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';

describe('AiService', () => {
  let service: AiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IS_RUNNING_TEST, useValue: true },
        {
          provide: ColorNameService,
          useClass: ColorNameServiceMock
        }
      ]
    });
    service = TestBed.inject(AiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  if (window.ai) {
    describe('AI is available', () => {
      it('should be available', () => {
        expect(service.isAvailable).toBeTrue();
      });

      it('should prompt', async () => {
        /*
         * During testing, the timeout is set to 10ms and the AI will take longer than 10ms to respond.
         * This test only checks if the API is still working since the error message will be different.
         * Changes to the API are expected, since the API is still experimental.
         */
        await expectAsync(service.prompt('Test')).toBeRejectedWithError('AI took too long to respond');
      });

      it('should generate palette', async () => {
        /*
         * During testing, the timeout is set to 10ms and the AI will take longer than 10ms to respond.
         * This test only checks if the API is still working since the error message will be different.
         * Changes to the API are expected, since the API is still experimental.
         */
        await expectAsync(service.generatePalette('#000000')).toBeRejectedWithError('AI failed to generate a palette');
      });
    });
  } else {
    describe('AI is not available', () => {
      it('should be unavailable', () => {
        expect(service.isAvailable).toBeFalse();
      });

      it('should throw an error when prompting', async () => {
        await expectAsync(service.prompt('Test')).toBeRejectedWithError('AI is not available');
      });

      it('should throw an error when generating palette', async () => {
        await expectAsync(service.generatePalette('#000000')).toBeRejectedWithError('AI is not available');
      });
    });
  }
});
