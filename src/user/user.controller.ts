import { Body, Controller, Get, Inject, Req, Res, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { Validate } from 'class-validator';
import { CreateUserDto } from './dto/user-create.dto';
import { UserGuard } from './guards/user.guard';
import { Test } from './decorator/test.decorator';
import { Ammar } from './decorator/ammar.decorator';
import { Reflector } from '@nestjs/core';
import { RateLimiterGuard } from './guards/rate-limiter.guard';
import { RateLimit } from './decorator/rate-limit.decorator';
import { TestingInterceptor } from './interceptor/testing.interceptor';

@Controller('user')
// make different to check different decorator
// @UseGuards(RateLimiterGuard)
// @UseInterceptors(TestingInterceptor)
export class UserController {

   constructor(private userService : UserService, private reflector: Reflector){}
   @Get('create')
   @Test('ammar', 'khan')
   @Ammar('this is value comming from decorator')
   @RateLimit(1,1)
   async getUser(@Body() createUserDto : CreateUserDto, @Res() res: Response) {
    console.log('body ===========');
    console.log(createUserDto);
    this.userService.getAllUsers();
    const handler = this.getUser;
    const data = this.reflector.getAllAndOverride('test', [
      handler,
      UserController
    ])
    console.log('data from reflector in user controller ==============', data);
    return res.send({message: 'Hello'});
   }

   @Get('hello')
   @RateLimit(1, 5)
   async helloUser(@Res() res: Response) {
      console.log('hello user');
      return res.send({message: 'Hello user'});
   }

   @Get('middleware')
   async testMiddleware(@Res() res: Response) {
      console.log('hello user');
      return res.send({message: 'Hello user'});
   }
}
