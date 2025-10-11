import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUsuarioDto } from './create-usuario.dto';
import { Usuario } from './user.entity';

@ApiTags('Usuários') // 🔹 agrupa endpoints no Swagger
@Controller('usuarios')
export class UserController {
    constructor(private usuarioService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: Usuario })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        return this.usuarioService.create(createUsuarioDto);
    }
}
