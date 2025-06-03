import { Controller, Get, Req, Res } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobService: JobsService, private readonly configService: ConfigService) {}

    @Get('hello')
    async test(@Req() req: Request, @Res() res: Response) {
        console.log('this is my test function in jobs controller');
        const dbName = await this.configService.get('DB_NAME');
        return res.send({message: 'Hello from jobs',
            dbName
        });
    }

}
