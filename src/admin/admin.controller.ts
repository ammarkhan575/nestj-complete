import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('admin')
export class AdminController {
    constructor(configService: ConfigService) {
        const dbName = configService.get<string>('ADMIN_DATABASE.db_name');
        console.log(`Admin Database Name: ${dbName}`);

    }
}
