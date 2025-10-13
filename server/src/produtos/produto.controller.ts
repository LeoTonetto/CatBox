import { Controller, Get, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) { }

    @Get()
    async findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Produto | null> {
        return this.produtoService.findOne(id);
    }
}
