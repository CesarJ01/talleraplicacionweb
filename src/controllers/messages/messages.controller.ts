/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    public getHello(): string {
        return "Hello World";
    }


}
