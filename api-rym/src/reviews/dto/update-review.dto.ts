import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    readonly userId?: number;
    readonly albumId?: number;
    readonly rating?: number;
    readonly reviewText?: string;
}
