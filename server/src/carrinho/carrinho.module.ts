import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from './carrinho.entity';
import { CarrinhoItem } from './carrinho-item.entity';
import { Produto } from '../produtos/produto.entity';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Carrinho, CarrinhoItem, Produto])],
    controllers: [CarrinhoController],
    providers: [CarrinhoService],
    exports: [CarrinhoService],
})
export class CarrinhoModule { }
