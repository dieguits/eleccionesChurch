import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentantesComponent } from './components/representantes/representantes.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

const routes: Routes = [
  { path: '', component: RepresentantesComponent },
  { path: 'resultados', component: ResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
