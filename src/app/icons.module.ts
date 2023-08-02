import { NgModule } from '@angular/core'
import { NgIconsModule } from '@ng-icons/core'
import {
  simpleCss3,
  simpleLess,
  simpleSass,
  simpleTailwindcss,
} from '@ng-icons/simple-icons'
import {
  heroPlusCircle,
  heroXMark,
  heroSwatch,
  heroAdjustmentsHorizontal,
  heroArchiveBoxArrowDown,
} from '@ng-icons/heroicons/outline'
import {
  heroSwatchSolid,
  heroAdjustmentsHorizontalSolid,
  heroRectangleGroupSolid,
  heroPencilSolid,
  heroTrashSolid,
  heroArchiveBoxArrowDownSolid,
  heroBookmarkSolid,
  heroArrowPathSolid,
} from '@ng-icons/heroicons/solid'
import { heroChevronDownMini } from '@ng-icons/heroicons/mini'

@NgModule({
  imports: [
    NgIconsModule.withIcons({
      simpleCss3,
      simpleLess,
      simpleSass,
      simpleTailwindcss,
      heroPlusCircle,
      heroXMark,
      heroSwatchSolid,
      heroAdjustmentsHorizontalSolid,
      heroRectangleGroupSolid,
      heroChevronDownMini,
      heroSwatch,
      heroAdjustmentsHorizontal,
      heroArchiveBoxArrowDown,
      heroPencilSolid,
      heroTrashSolid,
      heroArchiveBoxArrowDownSolid,
      heroBookmarkSolid,
      heroArrowPathSolid,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
