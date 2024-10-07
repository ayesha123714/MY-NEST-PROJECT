import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  productid: string;

  @Column()
  title: string;

  @Column('decimal', {nullable: true})
 
  price: number;
   @Column({nullable: true})

  description:string;
 
  @Column({nullable: false})
   userId:string
  //  @ManyToOne(() => UserEntity, (user) => user.products, { eager: true })
  //  user: UserEntity;
  @Column({nullable: true})
  updatedAt: Date;

}


