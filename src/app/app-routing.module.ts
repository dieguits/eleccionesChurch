import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentantesComponent } from './components/representantes/representantes.component';

const routes: Routes = [
  { path: '', component: RepresentantesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
