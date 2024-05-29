export class CreateCommentDto {
    readonly reviewId: number;
    readonly userId: number;
    readonly commentText: string;
}
