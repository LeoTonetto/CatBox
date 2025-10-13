import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CarrinhoModule } from '../carrinho/carrinho.module';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'chave-super-secreta', // ideal usar .env
        signOptions: { expiresIn: '1h' }, // expira em 1 hora],
    }),
        CarrinhoModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
