import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    async getAllUsers(){
        console.log('this is my get all user service function');
        return;
    }
}
