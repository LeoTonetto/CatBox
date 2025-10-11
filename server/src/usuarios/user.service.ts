import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './user.entity';
import { CreateUsuarioDto } from './create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        const { nome_usuario, email_usuario, cpf_usuario, senha_usuario } = createUsuarioDto;

        // 🔐 Gera o hash da senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(senha_usuario, saltRounds);

        const usuario = this.usuarioRepository.create({
            nome_usuario: nome_usuario.toUpperCase(),
            email_usuario: email_usuario.toUpperCase(),
            cpf_usuario,
            senha_usuario: hashedPassword,
        });

        return this.usuarioRepository.save(usuario);
    }
}
