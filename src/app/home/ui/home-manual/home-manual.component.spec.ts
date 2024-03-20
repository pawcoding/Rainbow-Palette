import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeManualComponent } from './home-manual.component';

describe('HomeManualComponent', () => {
  let component: HomeManualComponent;
  let fixture: ComponentFixture<HomeManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeManualComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
