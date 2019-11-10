import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: 'psicologos'})
export class PsicologoEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500, nullable: false })
    nome: string;
    @Column({ length: 20, nullable: false })
    crp: string;
    @Column({ length: 100, nullable: false })
    nomeclinica: string;
    @Column({ length: 255, nullable: false })
    email: string;
}