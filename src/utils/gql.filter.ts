import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // Convert generic ArgumentsHost to GraphQL Context
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();

    // Handle standardized HttpExceptions (e.g., BadRequestException, UnauthorizedException)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse() as any;

      return new GraphQLError(responseBody.message || exception.message, {
        extensions: {
          code: responseBody.error || 'HTTP_EXCEPTION',
          status,
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Handle all other unexpected system/runtime errors
    return new GraphQLError(exception.message || 'Internal server error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString(),
      },
    });
  }
}
