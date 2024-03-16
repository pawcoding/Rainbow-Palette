import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AnalyticsService,
  AnalyticsServiceMock,
} from '../shared/data-access/analytics.service';
import {
  LanguageService,
  LanguageServiceMock,
} from '../shared/data-access/language.service';
import ImprintComponent from './imprint.component';

describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprintComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: AnalyticsService, useClass: AnalyticsServiceMock },
        { provide: LanguageService, useClass: LanguageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
