import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RequestFormatComponent } from './request-format.component';

describe('RequestFormatComponent', () => {
  let component: RequestFormatComponent;
  let fixture: ComponentFixture<RequestFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFormatComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
