import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const {email, userName, passWord} = createUserDto
    const salt = 10
    const passwordHash = await bcrypt.hash(passWord, salt)


    try{
      return this.prisma.user.create({
        data:{
          email,
          userName,
          passWord: passwordHash,
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async findAll() {
    try{
      return this.prisma.user.findMany()
    }catch(err){
      console.log(err)
    };
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { user_id: id }, // Passa um objeto com a chave `id`
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const {userName} = updateUserDto

    try{
      return this.prisma.user.update({
        where: {user_id: id},
        data: updateUserDto
      })
    }catch(err){
      console.log(err)
    }
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { userName: username },
    });
  }
  
  async findOneByEmail(email: string){
    return this.prisma.user.findUnique({
      where: {email}
    })
  }

  async remove(id: number) {
    try{
      await this.findOne(id)
      return this.prisma.user.delete({
        where: {user_id: id}
      })
    }catch(err){
      console.log(err)
    }
  }
}
