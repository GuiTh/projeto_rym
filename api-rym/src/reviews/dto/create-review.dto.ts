export class CreateReviewDto {
    readonly userId: number;
    readonly albumId: number;
    readonly rating: number;
    readonly reviewText?: string;
}
