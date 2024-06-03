import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    readonly title?: string;
    readonly releaseDate?: Date;
    readonly coverUrl?: string;
    readonly artistId?: number;
}
