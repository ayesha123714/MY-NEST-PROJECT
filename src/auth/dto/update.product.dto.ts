import { IsOptional,IsString,IsNumber } from "class-validator";
export class UpdateProductDto{
    
    @IsOptional()
    @IsString()
    title?:string;
    @IsOptional()
    @IsString()
    description?:string;
    @IsNumber()
    @IsOptional()
    price?:number;
    @IsString()
    @IsOptional()
    userId?: string;  
  
}