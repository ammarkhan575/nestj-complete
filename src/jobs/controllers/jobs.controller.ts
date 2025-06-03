import { Controller, Get, Req, Res } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { Request, Response } from 'express';

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobService: JobsService) {}

    @Get('hello')
    async test(@Req() req: Request, @Res() res: Response) {
        console.log('this is my test function in jobs controller');
        return res.send({message: 'Hello from jobs'});
    }

}
