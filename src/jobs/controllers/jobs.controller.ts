import { Controller } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';

@Controller('jobs')
export class JobsController {

    constructor(private readonly jobService: JobsService) {}
    
}
