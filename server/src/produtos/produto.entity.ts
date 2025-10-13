import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarrinhoItem } from '../carrinho/carrinho-item.entity';

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id_produto: number;

    @Column()
    titulo_produto: string;

    @Column()
    descricao_produto: string;

    @Column('decimal', { precision: 10, scale: 2 })
    preco_produto: number;

    @OneToMany(() => CarrinhoItem, item => item.produto_carrinhoItem)
    itens: CarrinhoItem[];
}
