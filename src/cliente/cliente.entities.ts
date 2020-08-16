import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity("clientes")
export class Cliente{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ name: 'nome', type: 'varchar', length: '80' })
    nome: string;

    @Column({ name: 'cpf', type: 'varchar', length: '20' })
    cpf: string;

    @Column({ name: 'rg', type: 'varchar', length: '20' })
    rg: string;

    @Column({ name: 'email', type: 'varchar', length: '40' })
    email: string;

    @Column({ name: 'data_nascimento', type: 'varchar', length: '20' })
    dataNascimento: string;

}
/*ID
Name
Cpf
Rg
Email
Data de Nascimento
*/
