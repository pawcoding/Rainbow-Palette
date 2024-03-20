import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public async prompt(message: string, defaultValue: string): Promise<string | undefined> {
    return window.prompt(message, defaultValue) ?? undefined;
  }

  public async confirm(message: string): Promise<boolean> {
    return window.confirm(message);
  }

  public async alert(message: string): Promise<void> {
    window.alert(message);
  }
}

export class DialogServiceMock {
  public async prompt(_: string, value: string): Promise<string | undefined> {
    return `${value}_test`;
  }

  public async confirm(_: string): Promise<boolean> {
    return true;
  }

  public async alert(_: string): Promise<void> {
    return;
  }
}
