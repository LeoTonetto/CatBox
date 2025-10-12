import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService,
    ) { }

    async login(email_usuario: string, senha_usuario: string) {
        const user = await this.usuarioRepository.findOne({
            where: { email_usuario },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(senha_usuario, user.senha_usuario);
        if (!senhaValida) {
            throw new UnauthorizedException('E-mail ou senha inválidos');
        }

        const payload = { sub: user.id_usuario, email: user.email_usuario };

        const token = await this.jwtService.signAsync(payload);

        // Aqui você pode gerar JWT futuramente, mas por enquanto só retorna o user
        return {
            id_usuario: user.id_usuario,
            nome_usuario: user.nome_usuario,
            email_usuario: user.email_usuario,
            token,
        };
    }
}
