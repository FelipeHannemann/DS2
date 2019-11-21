import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity({name: 'postiti'})

export class PostitiEntity {
    @PrimaryGeneratedColumn()
    id:    number;
    @Column({nullable:false,length: 260})
    descricao:  string;
}