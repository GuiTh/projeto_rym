export class CreateAlbumDto {
    readonly title: string;
    readonly artistId?: number;
    readonly releaseDate?: Date;
    readonly coverUrl?: string;
}
