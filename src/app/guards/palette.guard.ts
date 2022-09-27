import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {PaletteService} from "../services/palette.service";

@Injectable({
  providedIn: 'root'
})
export class PaletteGuard implements CanActivate {
  constructor(
    private paletteService: PaletteService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.paletteService.hasPalette()) {
      return true
    } else {
      this.router.navigate([''])
      return false
    }
  }

}
