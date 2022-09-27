import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {NgModule} from "@angular/core";
import {PaletteGuard} from "./guards/palette.guard";
import {EditComponent} from "./pages/edit/edit.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'edit', pathMatch: 'full', canActivate: [PaletteGuard], component: EditComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
