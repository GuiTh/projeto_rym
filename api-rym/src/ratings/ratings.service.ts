import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createRatingDto: CreateRatingDto) {
    const {score, userId, albumId} = createRatingDto

    try{
      return this.prisma.ratings.create({
        data:{
          score,
          user:{connect: {user_id: userId}},
          album:{connect: {album_id: albumId}}
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async findAll() {
    try{
      return this.prisma.ratings.findMany({
        include:{
          user: true,
          album: true
        }
      });
    }catch(err){
      console.log(err)
    }
    
  }

  async findOne(rating_id: number) {
    try{
      return this.prisma.ratings.findUnique({
        where: {rating_id},
        include:{
          user: true,
          album: true
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async update(rating_id: number, updateRatingDto: UpdateRatingDto) {
    const {score} = updateRatingDto;
    try{
      return this.prisma.ratings.update({where: 
        {rating_id},
        data:{
          score: score
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async remove(rating_id: number) {
    try{
      return this.prisma.ratings.delete({
        where:{rating_id}
      })
    }catch(err){
      console.log(err)
    }
  }
}
