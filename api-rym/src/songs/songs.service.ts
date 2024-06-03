import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class SongsService {
  constructor( private readonly prisma: PrismaService){}

  async create(createSongDto: CreateSongDto) {
    const {title, duration, albumName, artistName} = createSongDto
    let album 
    let artist

    if(artistName){
      try{
        artist = await this.prisma.artists.findUnique({
          where:{name: artistName},
        })
      }catch(err){
        console.log(err)
      }
    }else{
      throw new NotFoundException(`Artista ${artistName} nao encontrado`)
    }

    if(albumName){
      try{
        album = await this.prisma.albuns.findUnique({
          where: { title: albumName},
        })
      }catch(error){
        console.log(error)
      }
    }else{
      throw new NotFoundException(`O album ${albumName} nao foi encontrado`)
    }
    return this.prisma.songs.create({
      data:{
        title,
        artist:{
          connect: {artist_id: artist.id },
        },
        album: album?{
          connect:{ title: album.title},
        }:undefined
      }
    })
    
  }

  async findAll() {
    try{
      return this.prisma.songs.findMany({
        include:{
          artist: true,
          album: true
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async findOne(id: number) {
    try{
      return this.prisma.songs.findUnique({
        where: {song_id: id},
        include:{
          artist: true,
          album: true
        }
      })
    }catch(err){
      console.log(err)
    };
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const {title, duration} = updateSongDto
    try{
      return this.prisma.songs.update({
        where:{song_id: id},
        data:{
          title,
          duration
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  async remove(id: number) {
    try{
      return this.prisma.songs.delete({
        where:{song_id: id}
      })
    }catch(err){
      console.log(err)
    } ;
  }
}
