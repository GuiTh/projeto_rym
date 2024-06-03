export class CreateSongDto {
    readonly title: string;
    readonly duration?: number;
    readonly albumName?: string;
    readonly artistName: string;
}
