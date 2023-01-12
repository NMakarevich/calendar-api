import { HttpException, HttpStatus } from '@nestjs/common';

export function NotFoundException(entity: string, id: string) {
  throw new HttpException(
    `${entity} with id "${id}" is not found`,
    HttpStatus.NOT_FOUND,
  );
}
