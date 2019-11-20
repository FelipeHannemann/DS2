import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoComponent } from './estado/estado.component';
import { CidadeComponent } from './cidade/cidade.component';
import { VoluntarioComponent } from './voluntario/voluntario.component';
import { PsicologoComponent } from './psicologo/psicologo.component';
import { ConsultaComponent } from './consulta/consulta.component';


const routes: Routes = [
  { path: 'estado', component: EstadoComponent},
  { path: 'cidade', component: CidadeComponent},
  { path: 'voluntarios', component: VoluntarioComponent},
  { path: 'psicologos', component: PsicologoComponent},
  { path: 'consultas', component: ConsultaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
