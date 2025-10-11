import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty({ example: 'Leonardo Tonetto', description: 'Nome completo do usuário' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    nome_usuario: string;

    @ApiProperty({ example: 'leo@email.com', description: 'Email do usuário' })
    @IsEmail({}, { message: 'Email inválido' })
    email_usuario: string;

    @ApiProperty({ example: '45025763878', description: 'CPF do usuário' })
    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @MinLength(11, { message: 'CPF inválido' })
    cpf_usuario: string;

    @ApiProperty({ example: 'senha1234', description: 'Senha do usuário (mínimo 8 caracteres)' })
    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
    senha_usuario: string;
}
