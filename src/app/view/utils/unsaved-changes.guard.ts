import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '../../shared/data-access/dialog.service';

export interface UnsavedChangesComponent {
  hasUnsavedChanges: boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<UnsavedChangesComponent> = async (component) => {
  if (!component.hasUnsavedChanges) {
    return true;
  }

  const dialogService = inject(DialogService);
  const translateService = inject(TranslateService);
  const leave = await dialogService.confirm(translateService.instant('view.unsaved-changes'));

  return leave;
};
