import { Dialog } from '../types/dialog.type'

export class RequestFormatDialog {
  static getNotification(): Dialog {
    return {
      id: 'request-export-format',
      actions: [
        {
          id: 'create-github-issue',
          callback: async () => {
            window.open(
              'https://github.com/pawcoding/Rainbow-Palette/issues?q=is%3Aissue+is%3Aopen+label%3Aexport',
              '_blank',
              'noopener noreferrer'
            )
            return undefined
          },
        },
      ],
    }
  }
}
