/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Put, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('carrinho')
@UseGuards(JwtAuthGuard)
export class CarrinhoController {
    constructor(private readonly carrinhoService: CarrinhoService) { }

    @Get()
    getCarrinho(@Request() req) {
        return this.carrinhoService.getCarrinho(req.user.id_usuario);
    }

    @Post('adicionar')
    adicionarItem(
        @Request() req,
        @Body() body: { produtoId: number; quantidade: number },
    ) {
        return this.carrinhoService.adicionarItem(req.user.id_usuario, body.produtoId, body.quantidade);
    }

    @Put('atualizar')
    atualizarQuantidade(
        @Request() req,
        @Body() body: { produtoId: number; quantidade: number },
    ) {
        return this.carrinhoService.atualizarQuantidade(req.user.id_usuario, body.produtoId, body.quantidade);
    }

    @Delete('remover/:produtoId')
    removerItem(@Request() req, @Param('produtoId') produtoId: number) {
        return this.carrinhoService.removerItem(req.user.id_usuario, produtoId);
    }

    @Delete('limpar')
    limparCarrinho(@Request() req) {
        return this.carrinhoService.limparCarrinho(req.user.id_usuario);
    }
}
