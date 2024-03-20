import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroAdjustmentsHorizontal, heroArchiveBoxArrowDown, heroSwatch } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-home-manual',
  standalone: true,
  imports: [NgIconComponent, TranslateModule],
  templateUrl: './home-manual.component.html'
})
export class HomeManualComponent {
  protected readonly heroSwatch = heroSwatch;
  protected readonly heroAdjustmentsHorizontal = heroAdjustmentsHorizontal;
  protected readonly heroArchiveBoxArrowDown = heroArchiveBoxArrowDown;
}
