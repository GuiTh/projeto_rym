export class CreateSongDto {
    readonly title: string;
    readonly duration?: number;
    readonly albumId: number;
}
