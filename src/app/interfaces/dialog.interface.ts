import {EventEmitter} from "@angular/core";

export interface Dialog {

  id: string,
  interpolateParams?: Object,
  actions?: Action[]

}

export interface Action {

  id: string
  action: EventEmitter<any>

}
