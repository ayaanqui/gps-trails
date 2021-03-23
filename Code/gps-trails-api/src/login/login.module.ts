
import { LoginController } from "./login.controller";
import { Module } from "@nestjs/common";
import { LoginService } from "./login.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [],
    controllers: [LoginController],
    providers: [LoginService]
})

export class LoginModule {

}