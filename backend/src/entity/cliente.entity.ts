import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CidadeEntity } from "./cidade.entity";

@Entity({ name: 'cliente' })
export class ClienteEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 6})
    codigo: string;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 255})
    email: string;

    @ManyToOne(type => CidadeEntity, {eager: true, nullable: true})
    @JoinColumn({name: 'cidade_id'})
    cidade: CidadeEntity;

    @Column({nullable: true})
    tabelapreco_id: number;
}
