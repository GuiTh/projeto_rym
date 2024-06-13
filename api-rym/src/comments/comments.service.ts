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

  async findAllByAlbum(album_id: number) {
    if (album_id) {
      const comments = await this.prisma.comments.findMany({
        where: { albumID: album_id },
      });

      return comments;
    } else {
      throw new Error('Album ID is required');
    }
  }

  findAllByUser(user_id: number){
    if(user_id){
      return this.prisma.comments.findMany({
        where: {userId: user_id},
      })
    }else{

      console.log("Usuario nao tem comentarios")
    }
  }

  async update(comment_id: number, user_id: number, updateCommentDto: UpdateCommentDto) {
    const {commentText} = updateCommentDto

    const comment = await this.prisma.comments.findUnique({
      where: {comment_id}
    })

    if(!comment){
      throw new NotFoundException("comentario nao encontrado")
    }else if(comment.userId !== user_id){
      throw new UnauthorizedException("Voce nao tem permissao para atualizar esse comentario")
    }

    try{
      await this.prisma.comments.update({
        where:{ comment_id },
        data:{
          commentText
        }
      })
    }catch(err){
      console.log(err)
    }

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
