import {EventEmitter} from "@angular/core";

export interface Dialog {

  message: string
  actions: Action[]

}

export interface Action {

  text: string
  title: string
  action: EventEmitter<any>

}
