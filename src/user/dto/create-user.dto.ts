import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  balance: number;
}
