/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Carrinho } from './carrinho.entity';
import { Produto } from '../produtos/produto.entity';

@Entity('carrinho_itens')
export class CarrinhoItem {
    @PrimaryGeneratedColumn()
    id_carrinhoItem: number;

    @ManyToOne(() => Carrinho, carrinho => carrinho.itens_carrinho)
    @JoinColumn({ name: 'ID_CARRINHO' })
    carrinho_carrinhoItem: Carrinho;

    @ManyToOne(() => Produto, produto => produto.itens)
    @JoinColumn({ name: 'ID_PRODUTO' })
    produto_carrinhoItem: Produto;

    @Column()
    quantidade_carrinhoItem: number;
}
