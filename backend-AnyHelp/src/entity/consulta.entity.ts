import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { PsicologoEntity } from "./psicologo.entity";
import { VoluntarioEntity } from "./voluntario.entity";


@Entity({ name: 'consulta' })
export class ConsultaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    nome: string;

    @Column({nullable: false })
    dtconsulta: Date;

    @ManyToOne(type => PsicologoEntity, { eager: true })
    @JoinColumn({ name: 'psicologos' })
    psicologo: PsicologoEntity;

    @ManyToOne(type => VoluntarioEntity, { eager: true })
    @JoinColumn({ name: 'voluntario' })
    Voluntario: VoluntarioEntity;

    

}