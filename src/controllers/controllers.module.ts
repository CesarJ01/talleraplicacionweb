/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { UserController } from './user/user.controller';

@Module({
    imports: [],
    controllers: [MessagesController, UserController],
    providers: []
})
export class ControllersModule {}
