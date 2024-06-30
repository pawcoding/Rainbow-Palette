import { TestBed } from '@angular/core/testing';
import { AiService } from './ai.service';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';

/**
 * TODO: Create tests for the AI service.
 * This is not done yet, because the AI service is a very experimental feature using experimental browser APIs.
 */

describe('AiService', () => {
  let service: AiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
});
