import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeSupportComponent } from './home-support.component';

describe('HomeSupportComponent', () => {
  let component: HomeSupportComponent;
  let fixture: ComponentFixture<HomeSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSupportComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
