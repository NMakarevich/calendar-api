import { HttpException, HttpStatus } from '@nestjs/common';

export function NotFoundException(entity: string, id: string) {
  throw new HttpException(
    `${entity} with id "${id}" is not found`,
    HttpStatus.NOT_FOUND,
  );
}

export function checkDate(dateString) {
  const currentDateString = new Date().toISOString().split('T')[0];
  if (new Date(dateString) < new Date(currentDateString))
    throw new HttpException(
      `Can't save task in past`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
}
