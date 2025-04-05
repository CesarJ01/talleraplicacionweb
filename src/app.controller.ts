/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()   /* es un decorador */
/* en general son clases que contienen decoradores */
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() /* decoradores especiales,  indicará el tipo de método 
  que la función está esperando.
  */
  getHello(): string {
    return this.appService.getHello();
  }
}
