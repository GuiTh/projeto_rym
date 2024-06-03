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
    // Verifique se req.user.id está correto e se está sendo passado para o serviço de comentários
  }

  @Get()
  findAll(@Req() req:any) {
    return this.commentsService.findAll(req.user.id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req:any) {
    return this.commentsService.remove(+id, req.user.id);
  }
}
