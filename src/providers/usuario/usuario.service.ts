/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity.ts';
import { Repository } from 'typeorm';
// UserService = UsuarioService

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}
    
    public async create (user: User): Promise<User> {
        const result = this.userRepository.create(user);
        return await this.userRepository.save(result);
    }
}

/* 
Un Repository es un objeto que genera automáticamente TypeORM a partir de las 
Entities que hemos definido.
*/
