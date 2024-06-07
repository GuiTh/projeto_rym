import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GenresService {
  constructor(private readonly prisma: PrismaService){}

  async create(createGenreDto: CreateGenreDto) {
    const {name, artistId} = createGenreDto  
    const genre = await this.prisma.genres.create({
      data:{
        name
      }
    })

    if(artistId){
      const artistExists = await this.prisma.artists.findUnique({
        where: {artist_id: artistId}
      })

      if(!artistExists){
        throw new NotFoundException("artista nao encontrado")
      }
      
      await this.prisma.artistGenre.create({
        data:{
          genreId: genre.genre_id,
          artistId: artistId
        }
      })
    }
    return genre
  }

  async findAll() {
    const genres = await this.prisma.genres.findMany({})

    return genres
  }

  async findOne(genre_id: number) {
    const genre = await this.prisma.genres.findUnique({
      where: {genre_id}
    })

    return genre
  }

  async findAlbumsByGenre(genre_id: number){
    const genre = await this.prisma.genres.findUnique({
      where: { genre_id },
      include: {AlbumGenres: {include: {album: true}}}
    })

    if(!genre){
      throw new NotFoundException("genero nao encontrado")
    }

    return genre.AlbumGenres.map((albumGenre) => albumGenre.album)
  }

  async update(genre_id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.prisma.genres.findUnique({
      where: { genre_id },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genre_id} not found`);
    }

    return this.prisma.genres.update({
      where: { genre_id },
      data: updateGenreDto,
    });
  }

  async remove(genre_id: number) {
    const genre = await this.prisma.genres.findUnique({
      where: { genre_id: genre_id },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genre_id} not found`);
    }

    return this.prisma.genres.delete({
      where: { genre_id: genre_id },
    });
  }
}
