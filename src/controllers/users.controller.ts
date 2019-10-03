import { Controller, Get, Post, Req, Res, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @Get()
    findAll(): any {              
        return this.usersService.findAll();
    }

    @Get('/avatar/:id')
    getAvatar(@Req() req: Request) {
        return this.usersService.getAvatar(req);
    }

    @Get('/:id')
    findOne(@Req() req: Request): any {
        return this.usersService.findOne(req);
    }

    @Delete('/:id')
    delete(@Req() req: Request): any {
        return this.usersService.delete(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    update(@Req() req: Request): any {
        return this.usersService.update(req);
    }

    @Post("/signup")
    registerNewUser(@Req() req: Request): any {
        console.log('1');        
        return this.usersService.registerNewUser(req);
    }

}
