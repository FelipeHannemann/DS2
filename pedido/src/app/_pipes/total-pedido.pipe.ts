import { Pipe, PipeTransform } from '@angular/core';
import { PedidoEntity } from '../_services/pedido.service';

@Pipe({
  name: 'TotalPedido',
  pure: false
})
export class TotalPedidoPipe implements PipeTransform {

  transform(items: PedidoEntity[]): number {
    return items.reduce((total, item) =>{
      return total + (item['qtdade'] *item['vlrunit']);
    }, 0);
  }

}