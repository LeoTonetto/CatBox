/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrinho } from './carrinho.entity';
import { CarrinhoItem } from './carrinho-item.entity';
import { Produto } from '../produtos/produto.entity';

@Injectable()
export class CarrinhoService {
    constructor(
        @InjectRepository(Carrinho)
        private carrinhoRepo: Repository<Carrinho>,

        @InjectRepository(CarrinhoItem)
        private carrinhoItemRepo: Repository<CarrinhoItem>,

        @InjectRepository(Produto)
        private produtoRepo: Repository<Produto>,
    ) { }

    // Cria ou retorna apenas o carrinho sem relações
    private async getOrCreateCarrinhoSimples(usuarioId: number) {
        let carrinho = await this.carrinhoRepo.findOne({
            where: { usuario: { id_usuario: usuarioId } },
        });

        if (!carrinho) {
            carrinho = this.carrinhoRepo.create({
                usuario: { id_usuario: usuarioId } as any,
            });
            carrinho = await this.carrinhoRepo.save(carrinho);
        }

        return carrinho;
    }

    // Retorna carrinho completo apenas quando necessário
    async getCarrinho(usuarioId: number) {
        return this.carrinhoRepo.findOne({
            where: { usuario: { id_usuario: usuarioId } },
            relations: ['itens_carrinho', 'itens_carrinho.produto_carrinhoItem'],
        });
    }

    async adicionarItem(usuarioId: number, produtoId: number, quantidade: number) {
        const carrinho = await this.getOrCreateCarrinhoSimples(usuarioId);
        const produto = await this.produtoRepo.findOneBy({ id_produto: produtoId });
        if (!produto) throw new Error('Produto não encontrado');

        let item = await this.carrinhoItemRepo.findOne({
            where: {
                carrinho_carrinhoItem: { id_carrinho: carrinho.id_carrinho },
                produto_carrinhoItem: { id_produto: produtoId },
            },
        });

        if (item) item.quantidade_carrinhoItem += quantidade;
        else {
            item = this.carrinhoItemRepo.create({
                carrinho_carrinhoItem: carrinho,
                produto_carrinhoItem: produto,
                quantidade_carrinhoItem: quantidade,
            });
        }

        await this.carrinhoItemRepo.save(item);

        // Apenas aqui fazemos a query final para enviar ao front
        return this.getCarrinho(usuarioId);
    }

    async removerItem(usuarioId: number, produtoId: number) {
        const carrinho = await this.getOrCreateCarrinhoSimples(usuarioId);

        const item = await this.carrinhoItemRepo.findOne({
            where: {
                carrinho_carrinhoItem: { id_carrinho: carrinho.id_carrinho },
                produto_carrinhoItem: { id_produto: produtoId },
            },
        });

        if (item) await this.carrinhoItemRepo.delete(item.id_carrinhoItem);

        return this.getCarrinho(usuarioId);
    }

    async atualizarQuantidade(usuarioId: number, produtoId: number, quantidade: number) {
        const carrinho = await this.getOrCreateCarrinhoSimples(usuarioId);

        const item = await this.carrinhoItemRepo.findOne({
            where: {
                carrinho_carrinhoItem: { id_carrinho: carrinho.id_carrinho },
                produto_carrinhoItem: { id_produto: produtoId },
            },
        });

        if (!item) throw new Error('Item não encontrado');

        item.quantidade_carrinhoItem = quantidade;
        await this.carrinhoItemRepo.save(item);

        return this.getCarrinho(usuarioId);
    }

    async limparCarrinho(usuarioId: number) {
        const carrinho = await this.getOrCreateCarrinhoSimples(usuarioId);

        await this.carrinhoItemRepo.delete({
            carrinho_carrinhoItem: { id_carrinho: carrinho.id_carrinho },
        });

        return this.getCarrinho(usuarioId);
    }
}
