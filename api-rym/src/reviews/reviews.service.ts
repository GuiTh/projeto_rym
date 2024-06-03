import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor( private readonly prisma: PrismaService){}

  create(createReviewDto: CreateReviewDto) {
    const {userId, albumId, reviewText} = createReviewDto;
    // try{
    //   return this.prisma.reviews.create({
    //     data:{
    //       reviewText
    //     }
    //   })
    // }catch(err){
    //   console.log(err)
    // }
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
