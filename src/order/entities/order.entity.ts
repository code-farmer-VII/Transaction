import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  price: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;
}
