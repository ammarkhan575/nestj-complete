import { SetMetadata, UseGuards, applyDecorators} from '@nestjs/common';
// import { UserGuard } from '../guards/user.guard';

export function Ammar(...text: string[]){

    console.log('inside test decorator ======');
    return SetMetadata('ammar', text);
}
