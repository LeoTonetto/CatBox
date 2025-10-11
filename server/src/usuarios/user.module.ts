import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UserController],
    providers: [UserService],
    exports: [TypeOrmModule],
})
export class UsersModule { }
