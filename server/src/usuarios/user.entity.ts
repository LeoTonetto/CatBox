import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('usuarios')

export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nome_usuario: string;

    @Column()
    email_usuario: string;

    @Column({ unique: true })
    cpf_usuario: string;

    @Column()
    senha_usuario: string;

    @CreateDateColumn()
    dataCriacao_usuario: Date;
}
