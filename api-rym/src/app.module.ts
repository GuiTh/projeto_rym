import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { AlbumsModule } from './albums/albums.module';
import { ArtistasModule } from './artistas/artistas.module';
import { SongsModule } from './songs/songs.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { GenresModule } from './genres/genres.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersController } from './users/users.controller';


@Module({
  imports: [ConfigModule.forRoot(), AlbumsModule, ArtistasModule, SongsModule, ReviewsModule, RatingsModule, CommentsModule, GenresModule, PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
