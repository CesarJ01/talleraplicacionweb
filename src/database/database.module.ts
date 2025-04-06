/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.ts';
import { UsuarioService } from '../providers/usuario/usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class DatabaseModule {}