/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './usuarios/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',           // seu usuário do MySQL
      password: '1234',           // sua senha do MySQL
      database: 'catbox',         // nome do banco que você criou
      autoLoadEntities: true,     // carrega automaticamente as entidades
      synchronize: false,         // cria as tabelas automaticamente (não use em produção)
      logging: true,
    }),
    UsersModule
  ],
})
export class AppModule { }
