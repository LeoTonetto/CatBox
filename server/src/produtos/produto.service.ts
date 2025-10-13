import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>,
    ) { }

    findAll(): Promise<Produto[]> {
        return this.produtoRepository.find();
    }

    findOne(id: number): Promise<Produto | null> {
        return this.produtoRepository.findOne({ where: { id_produto: id } });
    }

}
