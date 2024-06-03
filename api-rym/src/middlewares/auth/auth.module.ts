import { Module, MiddlewareConsumer, RequestMethod, Post } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from './jwt.strategy'
import { AuthMiddleware } from "./auth.middleware";

@Module({
    imports:[
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: "secretKey",
            signOptions: {expiresIn: '60m'},
        }),
    ],
    providers:[AuthService],
    exports: [AuthService],
})
export class AuthModule{
    configure(consumer: MiddlewareConsumer){
        consumer.apply(AuthMiddleware)
        .forRoutes({path: 'comments', method: RequestMethod.POST})
    }
}