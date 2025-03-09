import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(`Exception thrown: ${JSON.stringify(exception)}`);
    const errorResponse = {
      success: false,
      statusCode: status,
      message: exception instanceof HttpException ? exception.getResponse() : 'Internal server error',
    };

    response.status(status).json(errorResponse);
  }
}
