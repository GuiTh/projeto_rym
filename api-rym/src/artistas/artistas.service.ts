import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ArtistasService {
  constructor(private readonly prisma:PrismaService){}
  
  async create(createArtistaDto: CreateArtistaDto) {
    const {name, bio} = createArtistaDto

    const artist = await this.prisma.artists.create({
      data:{
        name, 
        bio
      }
    })

    return artist
  }

  async findAll() {
      const artists = await this.prisma.artists.findMany({})
    
      return artists
  }

  async findOne(artist_id: number) {
    const artist = await this.prisma.artists.findUnique({
      where: {artist_id}
    })

    return artist
  }

  async findByName(artist_name: string){
    const artist = await this.prisma.artists.findUnique({
      where: {name: artist_name}
    })

    return artist

  }

  async update(artist_id: number, updateArtistaDto: UpdateArtistaDto) {
    const {name, bio} = updateArtistaDto
    const data: any = {name, bio}

    const artist = await this.prisma.artists.findUnique({
      where: {artist_id},
    })

    if(!artist){
      throw new NotFoundException("Artista nao encontrado")
    }

    await this.prisma.artists.update({
      where: {artist_id},
      data
    })

    return artist


  }

  async remove(artist_id: number) {
    const artist = await this.prisma.artists.findUnique({
      where: {artist_id}
    })

    if(!artist){
      throw new NotFoundException("Artista nao encontrado")
    }

    await this.prisma.artists.delete({
      where: {artist_id}
    })
  }
}
