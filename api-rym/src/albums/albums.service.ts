import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AlbumsService {
  
  constructor( private readonly prisma:PrismaService){}

  async create(createAlbumDto: CreateAlbumDto) {
    const { title, artistId, releaseDate, coverUrl } = createAlbumDto
    
    const albumData: any ={
      title,
      releaseDate,
      coverUrl
    };

    const album = await this.prisma.albuns.create({
      data: albumData
    })

    if(artistId){
      await this.prisma.albumArtist.create({
        data:{
          albumId: album.album_id,
          artistId: artistId
        }
      })
    };
    
    return album
  }

  async findAllByArtist(artistId: number) {
    const album = await this.prisma.albuns.findMany({
      where:{
        AlbumArtist:{
          some:{
            artistId
          }
        }
      }
    })
    return album
  }

  async findOne(album_id: number) {
    const album = await this.prisma.albuns.findUnique({
      where: {album_id},
      include:{
        AlbumArtist: true
      }
    })

    if(!album){
      throw new NotFoundException("album nao encontrado")
    }
    return album 
  }

  async update(album_id: number, updateAlbumDto: UpdateAlbumDto) {
    const { title, releaseDate, coverUrl, artistId} = updateAlbumDto

    const existingAlbum = await this.prisma.albuns.findUnique({
      where: {album_id}
    })

    if(!existingAlbum){
      throw new NotFoundException("Album nao encontrado")
    }

    const albumData: any = {
      title,
      releaseDate,
      coverUrl
    }

    const updatedAlbum = await this.prisma.albuns.update({
      where: { album_id },
      data: albumData
    })

    if(artistId){
      await this.prisma.albumArtist.upsert({
        where: {albumId_artistId: {albumId: album_id, artistId: artistId}},
        update: {artistId: artistId},
        create: {albumId: album_id, artistId: artistId}
      })
    }

    return updatedAlbum
  }

  async remove(album_id: number) {
    const album = await this.prisma.albuns.findUnique({
      where :{album_id}
    })

    if(!album){
      throw new NotFoundException("Album nao encontrado")
    }

    await this.prisma.albuns.delete({
      where:{album_id}
    })

    return {message: "Album deletado com sucesso"}
  }
  
}
