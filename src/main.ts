/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    /* para habilitar el uso de decoradores de validacion */
    app.useGlobalPipes(new ValidationPipe(
      {
        transformOptions: {
          enableImplicitConversion: true
        }
      }
    ));

    /* direccionamiento URL se le agrega /api/user/index */
    app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
