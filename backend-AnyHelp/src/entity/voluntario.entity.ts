import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CidadeEntity } from "./cidade.entity";

@Entity({name: 'voluntario'})
export class VoluntarioEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500, nullable: false })
    nome: string;
    @Column({ length: 100, nullable: false })
    apelido: string;
    @Column({ length: 11, nullable: false })
    cpf: string;
    @Column({ length: 255, nullable: false })
    email: string;
    @ManyToOne(type => CidadeEntity, { eager: true })
    @JoinColumn({ name: 'cidade_id' })
    cidade: CidadeEntity;

}