import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutAnalyticsConsentComponent } from './layout-analytics-consent.component';

describe('LayoutAnalyticsConsentComponent', () => {
  let component: LayoutAnalyticsConsentComponent;
  let fixture: ComponentFixture<LayoutAnalyticsConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAnalyticsConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAnalyticsConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
