import { heroAdjustmentsHorizontalSolid, heroRectangleGroupSolid, heroSwatchSolid } from '@ng-icons/heroicons/solid';
import { NavigationEntry } from '../types/navigation-entry';

export const NAVIGATION_ENTRIES: Array<NavigationEntry> = [
  {
    title: 'layout.navigation.generate.title',
    path: '/',
    icon: heroSwatchSolid,
    description: 'layout.navigation.generate.description'
  },
  {
    title: 'layout.navigation.view.title',
    path: '/view',
    icon: heroAdjustmentsHorizontalSolid,
    description: 'layout.navigation.view.description'
  },
  {
    title: 'layout.navigation.preview.title',
    path: '/preview',
    icon: heroRectangleGroupSolid,
    description: 'layout.navigation.preview.description'
  }
];
