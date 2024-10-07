import { IsString, IsNotEmpty, IsNumber } from "class-validator";
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
   price: number;  
   @IsString()
  @IsNotEmpty()
   userId: string;  
}
