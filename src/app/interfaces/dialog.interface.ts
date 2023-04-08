import { EventEmitter } from '@angular/core'

export interface Dialog {
  id: string
  interpolateParams?: { [key: string]: string }
  actions?: Action[]
}

export interface Action {
  id: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  action: EventEmitter<any>
}
