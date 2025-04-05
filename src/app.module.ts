/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  // en imports: se importan los modulos..
  imports: [ControllersModule], /* hace referencia a todos 
  aquellos elementos que necesitan ser 
  importados para usar */
  controllers: [AppController], /* indica 
  todos aquellos 
  controladores que son parte del módulo. */
  providers: [AppService], /*  agrupa los servicios donde se 
  encuentran los métodos de acceso a los 
  datos */
})
export class AppModule {}
