import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { AlertConfig, ConfirmConfig, PromptConfig } from '../types/dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly _dialog = inject(Dialog);

  public async prompt(config: Omit<PromptConfig, 'type'>): Promise<string | undefined> {
    const promptComponent = await import('../ui/dialog/dialog.component').then((c) => c.DialogComponent);
    const dialogRef = this._dialog.open<string | undefined>(promptComponent, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        ...config,
        type: 'prompt'
      },
      panelClass: 'rp-modal-panel',
      width: 'inherit'
    });

    return await firstValueFrom(dialogRef.closed.pipe(map((result) => result ?? undefined)));
  }

  public async confirm(config: Omit<ConfirmConfig, 'type'>): Promise<boolean> {
    const confirmComponent = await import('../ui/dialog/dialog.component').then((c) => c.DialogComponent);
    const dialogRef = this._dialog.open<boolean>(confirmComponent, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        ...config,
        type: 'confirm'
      },
      panelClass: 'rp-modal-panel',
      width: 'inherit'
    });

    return await firstValueFrom(dialogRef.closed.pipe(map((result) => !!result)));
  }

  public async alert(config: Omit<AlertConfig, 'type'>): Promise<void> {
    const alertComponent = await import('../ui/dialog/dialog.component').then((c) => c.DialogComponent);
    const dialogRef = this._dialog.open<void>(alertComponent, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        ...config,
        type: 'alert'
      },
      panelClass: 'rp-modal-panel',
      width: 'inherit'
    });

    return await firstValueFrom(dialogRef.closed);
  }
}

export class DialogServiceMock {
  public async prompt(config: Omit<PromptConfig, 'type'>): Promise<string | undefined> {
    return `${config.initialValue}_test`;
  }

  public async confirm(_config: Omit<ConfirmConfig, 'type'>): Promise<boolean> {
    return true;
  }

  public async alert(_config: Omit<AlertConfig, 'type'>): Promise<void> {
    return;
  }
}
