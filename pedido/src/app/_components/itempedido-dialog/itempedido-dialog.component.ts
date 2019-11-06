import { Component, OnInit } from '@angular/core';
import { ProdutoEntity, ProdutoService } from 'src/app/_services/produto.service';
import { PedidoItemEntity } from 'src/app/_services/pedido.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-itempedido-dialog',
  templateUrl: './itempedido-dialog.component.html',
  styleUrls: ['./itempedido-dialog.component.scss']
})
export class ItempedidoDialogComponent {

  public itempedido: PedidoItemEntity;
  public produtos: ProdutoEntity[];

  constructor(private produtoService: ProdutoService, public dialodRef: MatDialogRef<ItempedidoDialogComponent>) {
    this.itempedido = new PedidoItemEntity();

    this.produtoService.find().subscribe(result => {
      this.produtos = result;
    })
  }

  public onDismiss(): void {
    this.dialodRef.close(false);
  }

  public onConfirm(): void {
    this.dialodRef.close(this.itempedido);
  }

  public changeItem(): void{
    this.itempedido.vlrunit = this.itempedido.produto.preco;
    this.itempedido.quantidade = 1;
  }

}
