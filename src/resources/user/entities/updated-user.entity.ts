import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedUser {
  @ApiProperty({ example: 'efdfbc10-9e7c-4787-adf3-9aa026f6d8f0' })
  id: string;

  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({
    example: 'Alex',
  })
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: 'd5c840cc20bd213aef3f8226a1750b6e.jpeg',
  })
  imageName: string;
}
