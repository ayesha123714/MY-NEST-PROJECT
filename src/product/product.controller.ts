import { Controller, Post, Get, Body, UseGuards, Param, Req,Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/auth/dto/create-product.dto';
import { ProductEntity } from 'src/entity/product.entity';
import { RequestWithUser } from 'src/interface/requestWithUser-interface';
import { UpdateProductDto } from 'src/auth/dto/update.product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create-product')
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return await this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth('JWT-auth')
  @Get('getUserProducts')
  async getUserProducts(@Req() req: RequestWithUser) {
    const userId = req.user.id;   
    return await this.productService.getProductById(userId); 
  }
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
  @Get('getAllProducts')
  async getAllProducts(){
    return await this.productService.getAllProducts();
  }

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Put('UpdateProduct/:productId')
async updateProduct(@Req() req: RequestWithUser, @Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto): Promise<any> {
  const userId = req.user.id; 
  return await this.productService.updateProduct(productId, userId, updateProductDto);
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Delete('DeleteProduct/:productId')
async deleteProduct(@Param('productId') productId: string):Promise<any>{
 
  return await this.productService.deleteProductById(productId)
}


}
