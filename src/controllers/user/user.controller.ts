/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import { Controller, ParseIntPipe, Delete, Get, Param, NotFoundException, Body, Post, Put, Res } from '@nestjs/common';
import { IUserResponse } from './dto/IUserResponse';
import { IPostUserRequest } from './dto/IPostUserRequest';
import { IPostUserResponse } from './dto/IPostUserResponse';
import { IPutUserRequest } from './dto/IPutUserRequest';
import { UsuarioService } from 'src/providers/usuario/usuario.service';
import { Response } from 'express';
import { User } from 'src/database/entities/user.entity.ts';

@Controller('user')
export class UserController {
  private users: IUserResponse[] = [
    {
      name: 'Alumno',
      lastname: 'AppWeb',
      birthdate: new Date(),
      age: 20,
      id: 0,
    },
    {
      name: 'Alumno2',
      lastname: 'AppWeb2',
      birthdate: new Date(),
      age: 22,
      id: 1,
    },
  ];

  constructor(private usuarioService: UsuarioService) {}

  @Get()
  public getUsers(): IUserResponse[] {
    return this.users;
  }

  @Get(':id')
  public getUser(@Param('id') id: number): IUserResponse {
    const user: IUserResponse = this.users.find(e => e.id == id);

    /* manejo de error 404 por si no existe user */
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  async postUser(@Body() request: IPostUserRequest): Promise<IPostUserResponse> {
    console.log('@POST');
    const response: IPostUserResponse = {
      data: null,
      statusCode: 200,
      statusDescription: 'Usuario Agregado',
      erros: null,
    };

    if (request) {
      const newUser: User = { /* error User, o UserEntity*/
        name: request.name,
        lastname: request.lastname,
        birthdate: request.birthdate,
        age: request.age,
      } as User;

      await this.usuarioService.create(newUser);
      return response;
    }
  }

    @Put(':id')
    async putUser(
    @Param('id', ParseIntPipe) id: number,  // Aquí aplicamos el ParseIntPipe
    @Body() request: IPutUserRequest,
    @Res() response: Response,
    ): Promise<Response> {
    // Si llegamos aquí, el 'id' ya es un número

    // Busca al usuario por el ID
    const user = this.users.find(u => u.id === id);

    // Si el usuario no existe, retornar 404
    if (!user) {
        return response.status(404).json({
        message: `User with ID ${id} not found`,
        error: 'Not Found',
        });
    }

    // Actualizar la información del usuario solo si es proporcionada en la solicitud
    user.name = request?.name ?? user.name;
    user.lastname = request?.lastname ?? user.lastname;
    user.birthdate = request?.birthdate ?? user.birthdate;
    user.age = !isNaN(request?.age) ? request?.age : user.age;

    // Retornar el usuario actualizado
    return response.status(200).json({
        message: 'User updated successfully',
        user,
    });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number, @Res() response: Response): Promise<Response> {
        if (isNaN(id)) return response.status(400).send();

        let isUserFound: boolean = false;

        this.users.filter(
            user => {
                if(user.id == id) {
                    this.users.splice(user.id, 1);
                    isUserFound= true;
                }
            }
        );

        if (!isUserFound) {
            return response.status(404).json({
                message: `User with ID ${id} not found`,
                error: 'Not Found',
            });
        }

        return response.status(200).json({
            message: `User with ID ${id} deleted successfully`,
            status: 'Success',
        });
    }

}
