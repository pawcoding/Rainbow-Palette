import { Component, OnInit } from '@angular/core';
import {Shade} from "../../models/shade.model";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  value: string
  invalid = false

  constructor(
    private notificationService: NotificationService
  ) {
    this.value = Shade.generateRandomShade().hex.toUpperCase()
  }

  ngOnInit(): void {
  }

  updateValue(value: string) {
    this.value = value.toUpperCase()
    this.invalid = !this.value.match(/^#[0-9A-Fa-f]{6}$/)
  }

  generatePalette() {
    this.notificationService.notification.emit('Generate palette')
  }

}
