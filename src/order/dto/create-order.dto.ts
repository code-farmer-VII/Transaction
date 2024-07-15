import { IsString, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  item: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @Min(1)
  userId: number;
}
