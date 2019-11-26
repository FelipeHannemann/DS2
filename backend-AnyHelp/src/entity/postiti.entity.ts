import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'postiti'})

export class PostitiEntity {
    @PrimaryGeneratedColumn()
    id:    number;
    @Column({nullable:true,length: 260})
    descricao:  string;
    @Column({nullable:true,length: 260})
    ajuda:  string;
}