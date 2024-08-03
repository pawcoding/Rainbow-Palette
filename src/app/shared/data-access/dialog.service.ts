import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlertConfig } from '../types/dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly _dialog = inject(Dialog);

  public async prompt(message: string, defaultValue: string): Promise<string | undefined> {
    return window.prompt(message, defaultValue) ?? undefined;
  }

  public async confirm(message: string): Promise<boolean> {
    return window.confirm(message);
  }

  public async alert(config: Omit<AlertConfig, 'type'>): Promise<void> {
    const alertComponent = await import('../ui/dialog/dialog.component').then((c) => c.DialogComponent);
    const dialogRef = this._dialog.open<void>(alertComponent, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        ...config,
        type: 'alert'
      },
      panelClass: 'rp-modal-panel'
    });

    return await firstValueFrom(dialogRef.closed);
  }
}

export class DialogServiceMock {
  public async prompt(_: string, value: string): Promise<string | undefined> {
    return `${value}_test`;
  }

  public async confirm(_: string): Promise<boolean> {
    return true;
  }

  public async alert(_config: Omit<AlertConfig, 'type'>): Promise<void> {
    return;
  }
}
