import { VersionEvent } from '@angular/service-worker';
import { Observable, Subject } from 'rxjs';
import { sleep } from './sleep';

const oldVersion = { hash: 'OLD', appData: { version: '0.0.0' } };
const newVersion = { hash: 'NEW', appData: { version: '1.0.0' } };

export class SwUpdateMock {
  private readonly _versionUpdates = new Subject<VersionEvent>();
  public readonly unrecoverable = new Subject<void>();

  public get versionUpdates(): Observable<VersionEvent> {
    return this._versionUpdates.asObservable();
  }

  public async emitNoUpdateAvailable(): Promise<void> {
    this._versionUpdates.next({
      type: 'NO_NEW_VERSION_DETECTED',
      version: oldVersion
    });

    await sleep(10);
  }

  public async emitUpdateAvailable(): Promise<void> {
    this._versionUpdates.next({
      type: 'VERSION_DETECTED',
      version: newVersion
    });

    await sleep(10);
  }

  public async emitInstallationFailed(): Promise<void> {
    this._versionUpdates.next({
      type: 'VERSION_INSTALLATION_FAILED',
      version: newVersion,
      error: 'Installation failed'
    });

    await sleep(10);
  }

  public async emitUpdateReady(): Promise<void> {
    this._versionUpdates.next({
      type: 'VERSION_READY',
      currentVersion: oldVersion,
      latestVersion: newVersion
    });

    await sleep(10);
  }
}
