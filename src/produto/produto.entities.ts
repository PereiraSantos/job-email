import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

 
@Entity("produtos")
export class Produto{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'nome', type: 'varchar', length: '80' })
    nome: string;

    @Column({ name: 'descricao', type: 'varchar', length: '40' })
    descricao: string;

    @Column({ name: 'preco' })
    preco: number;

    @Column({ name: 'oferta' })
    oferta: number;
}
/*
d
Name
Description
Price
Offer Price
*/