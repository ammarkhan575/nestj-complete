import { Controller, Get, Req, Res } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

// define the interface for the JWT configuration
// This interface should match the structure of your JWT configuration
interface JWTConfig {
    "JWT.SECRET": string;
    "JWT.EXPIRES_IN": string;
}

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobService: JobsService, private readonly configService: ConfigService<JWTConfig | any>) {
        // console.log(configService.get('appName'))
        // console.log(configService.get('nested.anotherKey.subKey'));
        // console.log(configService.get('database.default'));
        console.log(configService.get('JWT.SECRET'));
        // we define
        console.log(configService.get('JWT.EXPIRES_IN'));
        console.log(configService.get<string>('ADMIN_DATABASE.db_name'))
    }

    @Get('hello')
    async test(@Req() req: Request, @Res() res: Response) {
        console.log('this is my test function in jobs controller');
        // const dbName = await this.configService.get('DB_NAME');
        return res.send({message: 'Hello from jobs'
        });
    }

}
