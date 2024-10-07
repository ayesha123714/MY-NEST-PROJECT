import { Injectable, NotFoundException,Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/entity/product.entity';
import { CreateProductDto } from 'src/auth/dto/create-product.dto';
import { UpdateProductDto } from 'src/auth/dto/update.product.dto';


    @Injectable()
    export class ProductService {
  
      constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
      ) {}
      async create(createProductDto: CreateProductDto,): Promise<ProductEntity> {
        // console.log(createProductDto)
        const { title, description, price,userId} = createProductDto;
        const product = this.productRepository.create(
          {
            title: title,
            description: description,
            price: price,
            userId: userId
         
            
          }
        );
        return await this.productRepository.save(product);
      }
     
  
    async findAll():Promise<ProductEntity[]>{
    return this.productRepository.find()
  }

  async getProductById(userId: string): Promise<ProductEntity[]> {
    const product = await this.productRepository.find({
      where: { userId :userId },
    });
  
    if (!product) {
      throw new NotFoundException('Product not found'); 
    }
    return product;
  }


  async getAllProducts(): Promise<any>{
    return await this.productRepository.find();
  }


async updateProduct(productId: string, userId: string, updateProductDto: UpdateProductDto): Promise<any> {
 
  const product = await this.productRepository.findOne({
    where: { productid: productId, userId: userId }, 
  });
  if (!product) {
    throw new NotFoundException(`Product with ID ${productId} for user ID ${userId} was not found`);
  }
  product.title = updateProductDto.title || product.title;
  product.price = updateProductDto.price || product.price;
  product.description = updateProductDto.description || product.description;
  product.updatedAt = new Date();
  await this.productRepository.save(product);
  return {
    success: true,
    message: 'Product updated successfully',
    data: product, 
  };
}


 async deleteProductById(productId: string): Promise<any> {
  const product = await this.productRepository.findOne({ where: {  productid: productId } });


  if (!product) {
    throw new NotFoundException(`Product with ID ${productId} not found.`);
  }

  await this.productRepository.delete(productId);

  return {
    success: true,
    message: 'Product deleted successfully',
  };
}
}

