import { SetMetadata, UseGuards, applyDecorators} from '@nestjs/common';
import { UserGuard } from '../guards/user.guard';
export const ROLES_KEY = 'roles';

export function Test(...test: string[]){

    console.log('inside test decorator ======');
    return applyDecorators(
        SetMetadata('test',test),
        UseGuards(UserGuard)
    )
}
