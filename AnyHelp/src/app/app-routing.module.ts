import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadoComponent } from './estado/estado.component';
import { CidadeComponent } from './cidade/cidade.component';


const routes: Routes = [
  { path: 'estado', component: EstadoComponent},
  { path: 'cidade', component: CidadeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
