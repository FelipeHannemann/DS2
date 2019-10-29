import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CidadeComponent } from './cidade/cidade.component';
import { EstadoComponent } from './estado/estado.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { TabelaprecoComponent } from './tabelapreco/tabelapreco.component';
import { ProdutoComponent } from './produto/produto.component';
import { PedidoComponent } from './pedido/pedido.component';


const routes: Routes = [
  { path: 'cliente', component: ClienteComponent},
  { path: 'cidade', component: CidadeComponent},
  { path: 'estado', component: EstadoComponent},
  { path: 'pedido', component: PedidoComponent},
  { path: 'produtos', component: ProdutoComponent},
  { path: 'tabelaprecos', component: TabelaprecoComponent},
  { path: 'vendedor', component: VendedorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
