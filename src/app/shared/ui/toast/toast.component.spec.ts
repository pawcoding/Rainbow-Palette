import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Toast } from '../../interfaces/toast.interface';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;

    // @ts-expect-error - Bind required input signal
    component.toast = signal<Toast>({ type: 'test', message: 'test message' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close toast', () => {
    spyOn(component.close, 'emit');

    component.closeToast();

    expect(component.close.emit).toHaveBeenCalled();
  });
});
