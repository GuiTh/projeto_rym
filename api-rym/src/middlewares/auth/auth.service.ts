import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { UsersService } from "src/users/users.service";


@Injectable()

export class AuthService{
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.passWord === pass) {
          const { passWord, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
      verifyToken(token: string) {
        return this.jwtService.verify(token);
      }
}