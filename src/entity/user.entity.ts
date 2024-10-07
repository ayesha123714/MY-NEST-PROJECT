import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({unique:true})
  email:string;

  @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
  updatedAt: Date;
  @Column({ nullable: true }) 
  otp: string;
}

 