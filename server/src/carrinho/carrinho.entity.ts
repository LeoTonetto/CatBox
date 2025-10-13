/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/user.entity';
import { CarrinhoItem } from './carrinho-item.entity';

@Entity('carrinhos')
export class Carrinho {
    @PrimaryGeneratedColumn()
    id_carrinho: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @OneToMany(() => CarrinhoItem, item => item.carrinho_carrinhoItem)
    itens_carrinho: CarrinhoItem[];
}
