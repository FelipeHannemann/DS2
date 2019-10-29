import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ClienteEntity } from "./cliente.entity";
import { VendedorEntity } from "./vendedor.entity";
import { itemPedidoEntity } from "./itempedido.entity";


@Entity({ name: 'pedido' })
export class PedidoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 6, nullable: false })
    codigo: string;

    @Column({ nullable: false, type: 'date' })
    dtpedido: Date;

    @Column({ length: 255, nullable: false })
    observacao: string;

    @ManyToOne(type => PedidoEntity, { eager: true })
    @JoinColumn({ name: 'cliente_id' })
    cliente: ClienteEntity;

    @ManyToOne(type => PedidoEntity, { eager: true })
    @JoinColumn({ name: 'vendedor_id' })
    vendedor: VendedorEntity;

    @OneToMany(type => itemPedidoEntity, item => item.pedido, {eager: true}) 
    itens: itemPedidoEntity[];

}