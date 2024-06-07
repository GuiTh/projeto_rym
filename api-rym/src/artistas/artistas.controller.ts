import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistasService.create(createArtistaDto);
  }

  @Get()
  findAll() {
    return this.artistasService.findAll();
  }

  @Get(':artist_name')
  findByName(@Param('artist_name') artist_name: string){
    return this.artistasService.findByName(artist_name)
  }

  @Get(':artist_id')
  findOne(@Param('artist_id') artist_id: string) {
    return this.artistasService.findOne(+artist_id);
  }

  @Patch(':artist_id')
  update(@Param('artist_id') artist_id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistasService.update(+artist_id, updateArtistaDto);
  }

  @Delete(':artist_id')
  remove(@Param('artist_id') artist_id: string) {
    return this.artistasService.remove(+artist_id);
  }
}
