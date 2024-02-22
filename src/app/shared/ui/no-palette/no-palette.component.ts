import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowUturnLeft } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-no-palette',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, RouterLink],
  templateUrl: './no-palette.component.html',
  styleUrl: './no-palette.component.css',
})
export class NoPaletteComponent {
  public readonly parent = input.required<'editor' | 'preview'>();

  protected readonly heroArrowUturnLeft = heroArrowUturnLeft;
}
