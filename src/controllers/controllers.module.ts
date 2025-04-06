/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from 'src/providers/usuario/usuario.service';
import { User } from 'src/database/entities/user.entity.ts';

/* Luego, para evitar problemas de dependencias, importaremos TypeOrmModule en 
nuestro módulo de controladores: */ 

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [MessagesController, UserController],
    providers: [UsuarioService]
})
export class ControllersModule {}
