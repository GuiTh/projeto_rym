import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService){}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const {commentText, albumId} = createCommentDto

    try{
      return this.prisma.comments.create({
        data:{
          commentText,
          album: {connect: {album_id: albumId}},
          user: {connect: {user_id: userId}}
        }
      })
    }catch(err){ 
      console.log(err)
    }
  }

  findAll(album_id: number) {
    if(album_id){
      return this.prisma.comments.findMany({
        where: {albumID: album_id},
      })
    }else{
      console.log("Sem comentarios nesse album, faça seu primeiro comentario!")
    }
  }


  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(commentId: number, userId:number) {
    const comment = await this.prisma.comments.findUnique({
      where: {comment_id: commentId},
      include:{user: true}
    })
    if(!comment){
      throw new NotFoundException("Nenhum comentario encontrado")
    }else if(comment.userId !== userId){
      throw new UnauthorizedException("voce nao tem permissao para exluir esse comentario")
    }
    
    return this.prisma.comments.delete({
      where: {comment_id: commentId}
    })
  }
}
