import { PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

class OverlayRefMock {
  public attach<T>(_portal: ComponentPortal<T>): void {}
  public detach(): void {}
  public updatePositionStrategy(_positionStrategy: PositionStrategy): void {}
}

export class OverlayMock {
  public create(): OverlayRefMock {
    return new OverlayRefMock();
  }
}
