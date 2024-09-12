/*
export class UserTo {
    constructor(public email: string,
                public name: string,
                public contact: string) {
    }
}*/
// constructor ekak tyeddi decorators danna ba
// meka change krnne wenawa

import {IsEmail, IsEmpty, IsNotEmpty, Matches, MinLength} from "class-validator";

export class UserTo {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    @MinLength(2)
    name!: string;

    @IsNotEmpty()
    @Matches(/^0\d{2}-\d{7}$/)
    contact!: string;
}