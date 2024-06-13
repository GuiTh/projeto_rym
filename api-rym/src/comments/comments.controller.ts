import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    return this.commentsService.create(createCommentDto, req.user.id);
  }

  @Get('album/:album_id')
  async findAllByAlbum(@Param('album_id') album_id: number) {
    return await this.commentsService.findAllByAlbum(+album_id);
  }

  @Get('user_comments')
  findAllByUser(@Req() req:any){
    return this.commentsService.findAllByUser(req.user.id)
  }


  @Patch(':id')
  update(@Param('id') id: string, @Req() req:any, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, req.user.id, updateCommentDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req:any) {
    return this.commentsService.remove(+id, req.user.id);
  }
}
