export type Notification =
  | {
      id: string

      interpolateParams: { [key: string]: string }
    }
  | string
  | undefined
