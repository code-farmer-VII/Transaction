import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,Unique } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
@Entity()
// @Unique(['item'])
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @Column()
  price: number;

  @Column({type: "number"})
  userId: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;
}
