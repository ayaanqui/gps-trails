import { Injectable } from "@nestjs/common";

import { Login } from './login.model';

@Injectable()
export class LoginService {

    loginDetails: Login[] = [];

    insertLoginDetails(username: string, password: string) {
        const newLoginDetail = new Login(username, password);
        return newLoginDetail;
    }
}