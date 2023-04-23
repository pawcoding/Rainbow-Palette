import { EventEmitter } from '@angular/core'

export interface Dialog {
  id: string
  interpolateParams?: { [key: string]: string }
  actions?: Action[]
  style?: {
    align?: 'left' | 'center' | 'justify' | 'right'
    width?: 'small' | 'medium' | 'large'
  }
}

export interface Action {
  id: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  action: EventEmitter<any>
}
