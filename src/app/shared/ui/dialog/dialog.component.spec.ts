import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AlertConfig, ConfirmConfig, PromptConfig } from '../../types/dialog-config';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  describe('Alert', () => {
    let dialogRef: {
      close: () => void;
    };

    const config: AlertConfig = {
      type: 'alert',
      title: 'Alert',
      message: 'This is an alert message.'
    };

    beforeEach(async () => {
      dialogRef = {
        close: (): void => {}
      };

      await TestBed.configureTestingModule({
        imports: [DialogComponent, TranslateModule.forRoot()],
        providers: [
          {
            provide: DIALOG_DATA,
            useValue: config
          },
          {
            provide: DialogRef,
            useValue: dialogRef
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dismiss and confirm', () => {
      spyOn(dialogRef, 'close');

      component.dismiss();
      expect(dialogRef.close).toHaveBeenCalledTimes(1);

      component.confirm();
      expect(dialogRef.close).toHaveBeenCalledTimes(2);
    });
  });

  describe('Confirm', () => {
    let dialogRef: { close: (result?: boolean) => void };

    const config: ConfirmConfig = {
      type: 'confirm',
      title: 'Alert',
      message: 'This is an alert message.',
      confirmLabel: 'Yes'
    };

    beforeEach(async () => {
      dialogRef = {
        close: (_result?: boolean): void => {}
      };

      await TestBed.configureTestingModule({
        imports: [DialogComponent, TranslateModule.forRoot()],
        providers: [
          {
            provide: DIALOG_DATA,
            useValue: config
          },
          {
            provide: DialogRef,
            useValue: dialogRef
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dismiss', () => {
      spyOn(dialogRef, 'close');

      component.dismiss();
      expect(dialogRef.close).toHaveBeenCalledWith();
    });

    it('should confirm', () => {
      spyOn(dialogRef, 'close');

      component.confirm();
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('Prompt', () => {
    let dialogRef: { close: (result?: string) => void };

    const config: PromptConfig = {
      type: 'prompt',
      title: 'Alert',
      message: 'This is an alert message.',
      confirmLabel: 'Yes',
      initialValue: 'Test',
      label: 'Input',
      placeholder: 'Placeholder'
    };

    beforeEach(async () => {
      dialogRef = {
        close: (_result?: string): void => {}
      };

      await TestBed.configureTestingModule({
        imports: [DialogComponent, TranslateModule.forRoot()],
        providers: [
          {
            provide: DIALOG_DATA,
            useValue: config
          },
          {
            provide: DialogRef,
            useValue: dialogRef
          }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should dismiss', () => {
      spyOn(dialogRef, 'close');

      component.dismiss();
      expect(dialogRef.close).toHaveBeenCalledWith();
    });

    it('should dismiss when unchanged', () => {
      spyOn(dialogRef, 'close');

      component.confirm();
      expect(dialogRef.close).toHaveBeenCalledWith();
    });

    it('should not close when invalid', () => {
      spyOn(dialogRef, 'close');

      // @ts-expect-error - Input is protected
      component.input.setValue('');

      component.confirm();
      expect(dialogRef.close).toHaveBeenCalledTimes(0);
    });

    it('should confirm after change', () => {
      spyOn(dialogRef, 'close');

      // @ts-expect-error - Input is protected
      component.input.setValue('Test2');

      component.confirm();
      expect(dialogRef.close).toHaveBeenCalledWith('Test2');
    });
  });
});
