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
    const lowerCaseMail = email.toLowerCase()
    const lowerCaseName = userName.toLowerCase()

    try{
      return await this.prisma.user.create({
        data:{
          email: lowerCaseMail,
          userName: lowerCaseName,
          passWord: passwordHash,
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async findAll() {
    try{
      return await this.prisma.user.findMany()
    }catch(err){
      console.log(err)
    };
  }

  async findOne(id: number) {
    const user_id = id || "";

    if(!user_id) return 'usuario nao encontrado';

    try{
      return await this.prisma.user.findUnique({
        where: { user_id }// Passa um objeto com a chave `id`
      });
    }catch(err){
      console.log(err)
    }
    
  }

  async findOneByUsername(username: string) {
    const user_name = username || "";

    if(!user_name) return 'usuario nao encontrado';

    try{
      return await this.prisma.user.findUnique({
        where: { userName: username }
      });
    }catch(err){
      console.log(err)
    }
  }

  async findOneByEmail(email: string){
    const mail = email || "";

    if(!mail) return "usuario nao encontrado";

    try{
      return await this.prisma.user.findUnique({
        where: {email: mail}
      })
    }catch(err){
      console.log(err)
    }
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      return await this.prisma.user.update({
        where: {user_id: id},
        data: updateUserDto
      })
    }catch(err){
      console.log(err)
    }
  }

  async remove(id: number) {
    try{
      await this.findOne(id)
      return await this.prisma.user.delete({
        where: {user_id: id}
      })
    }catch(err){
      console.log(err)
    }
  }
}
