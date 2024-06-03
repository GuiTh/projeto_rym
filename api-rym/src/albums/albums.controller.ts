import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get('artist/:artistId')
  findAllByArtist(@Param('artistId') artistId: string) {
    return this.albumsService.findAllByArtist(Number(artistId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(Number(id), updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(Number(id));
  }
}
