import { Component, Input, computed, effect, inject } from '@angular/core'
import { MatomoTracker } from 'ngx-matomo-client'
import { DialogService } from 'src/app/services/dialog.service'

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  // declare input properties
  @Input()
  public dark = false

  // inject services
  private readonly _dialogService = inject(DialogService)
  private readonly _tracker = inject(MatomoTracker)

  // computed properties
  protected readonly dialog = this._dialogService.dialog
  protected readonly width = computed(() => {
    switch (this.dialog()?.style?.width) {
      case 'small':
        return 'max-w-md'
      case 'large':
        return 'max-w-2xl'
      default:
        return 'max-w-lg'
    }
  })
  protected readonly align = computed(() => {
    switch (this.dialog()?.style?.align) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'justify':
        return 'text-justify'
      default:
        return 'text-center'
    }
  })
  protected readonly customId = computed(() =>
    this.dialog()?.custom ? this.dialog()?.id : undefined
  )

  constructor() {
    // watch for new dialogs
    effect(() => {
      const dialog = this.dialog()

      if (dialog) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'auto'

      if (dialog && /export-(css|scss|tailwind)-(copy|file)/.test(dialog.id)) {
        const [category, action, name] = dialog.id.split('-')
        this._tracker.trackEvent(category, action, name)
      }
    })
  }

  /**
   * Close dialog
   */
  protected closeDialog(): void {
    this._dialogService.closeDialog()
  }

  /**
   * Trigger callback of a specific action. If no callback is defined, close the dialog.
   * @param actionId Id of the action
   */
  protected async triggerCallback(actionId: string): Promise<void> {
    const action = this.dialog()?.actions?.find(
      (action) => action.id === actionId
    )

    if (action?.callback) {
      const nextDialog = await action.callback()
      if (nextDialog) this._dialogService.openDialog(nextDialog)
      else this.closeDialog()
    } else {
      this.closeDialog()
    }
  }
}
