import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MobileService, MobileServiceMock } from '../../data-access/mobile.service';
import { ToastService, ToastServiceMock } from '../../data-access/toast.service';
import { ToastStackComponent } from './toast-stack.component';

describe('ToastStackComponent', () => {
  let component: ToastStackComponent;
  let fixture: ComponentFixture<ToastStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastStackComponent, TranslateModule.forRoot()],
      providers: [
        { provide: MobileService, useClass: MobileServiceMock },
        { provide: ToastService, useClass: ToastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
