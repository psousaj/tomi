import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const driverError = (exception as any).driverError;
        const errorCode = driverError?.code;

        // Só trata UNIQUE CONSTRAINT por enquanto
        const isConflict =
            errorCode === 'SQLITE_CONSTRAINT' || errorCode === '23505';

        if (isConflict) {
            return response.status(HttpStatus.CONFLICT).json({
                statusCode: HttpStatus.CONFLICT,
                message: 'Conflict: resource already exists',
                detail: driverError?.message,
            });
        }

        // Outros erros do TypeORM continuam como 500
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
        });
    }
}
