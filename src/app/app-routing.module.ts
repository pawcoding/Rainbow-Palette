import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {NgModule} from "@angular/core";
import {canEditPalette} from "./guards/palette.guard";
import {EditComponent} from "./pages/edit/edit.component";
import {PreviewComponent} from "./pages/preview/preview.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'edit', pathMatch: 'full', canActivate: [canEditPalette], component: EditComponent},
  {path: 'preview', pathMatch: 'full', canActivate: [canEditPalette], component: PreviewComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
