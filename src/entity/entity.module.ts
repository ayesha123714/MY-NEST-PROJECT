import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
      TypeOrmModule.forFeature([ProductEntity]),
    ],
  
    exports: [
      TypeOrmModule.forFeature([UserEntity]),
      TypeOrmModule.forFeature([ProductEntity]),
    ],
  })
  export class EntityModule {}