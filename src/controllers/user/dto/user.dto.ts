/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */


import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string; 

    @IsNotEmpty()
    @IsDate()
    birthdate: Date;

    @IsNotEmpty()
    @IsNumber()
    age: number;
    
}