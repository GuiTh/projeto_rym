import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    readonly reviewId?: number;
    readonly userId?: number;
    readonly commentText?: string;
}
