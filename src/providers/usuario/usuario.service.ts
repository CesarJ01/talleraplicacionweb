/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/controllers/user/dto/user.dto';
import { User } from 'src/database/entities/user.entity.ts';
import { Repository, UpdateResult } from 'typeorm';
// UserService = UsuarioService

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    /* QueryBuilder: All Users*/ 
    public async getAllUsers(): Promise<User[]> {
        const result = this.userRepository.find();
        return result;
    }

    /* QueryBuilder: User*/ 
    public async getCustomRepositoryToken(id: number): Promise<User> {
        try {
            const result = await this.userRepository.createQueryBuilder('user')
                                                    .where(
                                                        'user.id = :id', {id}
                                                    )
                                                    .getOne();
            return result;
        }
        catch (error: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            throw new Error(error);
        }
    }

    public async create (user: User): Promise<User> {
        const result = this.userRepository.create(user);
        return await this.userRepository.save(result);
    }

    /* aqui el error era que no es UserUpdateDTO es UserDTO por el validator */
    public async update(id: number, user: UserDTO): Promise<UpdateResult> {
        const result: UpdateResult = await this.userRepository.update(id,user);

        if(result.affected == 0) {
            return undefined; 
        }
        return result;
    }
}

/* 
Un Repository es un objeto que genera automáticamente TypeORM a partir de las 
Entities que hemos definido.
*/
