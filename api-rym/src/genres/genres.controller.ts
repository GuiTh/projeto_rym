import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':genre_id')
  findOne(@Param('genre_id') genre_id: string) {
    return this.genresService.findOne(+genre_id);
  }

  @Get(":genre_id/albumbs")
  findAlbumsByName(@Param("genre_id", ParseIntPipe) genre_id: number){
    return this.genresService.findAlbumsByGenre(genre_id)
  }

  @Patch(':genre_id')
  update(@Param('genre_id') genre_id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(+genre_id, updateGenreDto);
  }

  @Delete(':genre_id')
  remove(@Param('genre_id') genre_id: string) {
    return this.genresService.remove(+genre_id);
  }
}
