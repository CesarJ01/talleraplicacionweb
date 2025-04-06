/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.ts';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [],
  providers: [],
})
export class DatabaseModule {}