import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  ToastService,
  ToastServiceMock,
} from '../../data-access/toast.service';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let toastService: ToastServiceMock;

  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    toastService = new ToastServiceMock();

    await TestBed.configureTestingModule({
      imports: [ToastComponent, TranslateModule.forRoot()],
      providers: [{ provide: ToastService, useValue: toastService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close toast', () => {
    spyOn(toastService, 'hideToast');

    component.closeToast();

    expect(toastService.hideToast).toHaveBeenCalled();
  });
});
