import {EventEmitter} from "@angular/core";

export interface Notification {

  message: string
  actions: Action[]

}

export interface Action {

  text: string
  title: string
  action: EventEmitter<any>

}
