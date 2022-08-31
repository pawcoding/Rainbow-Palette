import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'light-switch',
  templateUrl: './light-switch.component.html',
})
export class LightSwitchComponent implements OnInit {

  @Input()
  dark: boolean | undefined

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  toggleTheme(): void {
    this.dark = this.storage.toggleTheme(!this.dark)
  }

}
