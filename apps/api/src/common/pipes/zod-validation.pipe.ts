import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "@tomi/validation";

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private schema: ZodSchema<T>) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (!metadata || !this.schema) {
            return value;
        }

        const validationResult = this.schema.safeParse(value);
        if (!validationResult.success) {
            throw new BadRequestException({
                message: 'Validation failed',
                errors: validationResult.error.format(),
            });
        }
        return validationResult.data;
    }
}