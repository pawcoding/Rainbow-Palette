import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot,} from '@angular/router';
import {PaletteService} from "../services/palette.service";

export const canEditPalette: CanActivateFn = async (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot
) => {
  const paletteService = inject(PaletteService)
  if (paletteService.hasPalette())
    return true

  const router = inject(Router)
  await router.navigate([''])
  return false
}
