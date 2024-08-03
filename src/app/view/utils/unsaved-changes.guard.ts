import { Signal, inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '../../shared/data-access/dialog.service';

export interface UnsavedChangesComponent {
  hasUnsavedChanges: Signal<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<UnsavedChangesComponent> = async (component) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  const dialogService = inject(DialogService);
  const leave = await dialogService.confirm({
    title: 'view.unsaved-changes.title',
    message: 'view.unsaved-changes.description',
    confirmLabel: 'common.continue'
  });

  return leave;
};
