/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importar ConfigModule y ConfigService
import { DatabaseModule } from './database/database.module';

/* el problema del reposityory era que lo hacia en app.module.ts y no en database */

@Module({
  imports: [
     
    ConfigModule.forRoot({
      isGlobal: true, // Configuración global (disponible en todo el proyecto)
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importar ConfigModule
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'), // Obtener valor de .env
        port: parseInt(configService.get('DB_PORT')), // Obtener valor de .env
        username: configService.get('DB_USERNAME'), // Obtener valor de .env
        password: configService.get('DB_PASSWORD'), // Obtener valor de .env
        database: configService.get('DB_NAME'), // Obtener valor de .env
        entities: [__dirname + '/dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService], // Inyectar ConfigService
    }),
    ControllersModule,
    DatabaseModule, // Tu módulo de controladores
  ],
  controllers: [AppController], // Controladores de la aplicación
  providers: [AppService], // Servicios de la aplicación
})
export class AppModule {}
