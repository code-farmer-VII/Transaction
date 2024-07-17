import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { queryObjects } from 'v8';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    const { item, price, userId } = createOrderDto;
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // const user = await queryRunner.manager.findOne(User, {
      //   where: { id: userId },
      //   lock: { mode: 'pessimistic_write' },
      // });

      const userRepo = queryRunner.manager.getRepository(User)

      const userOne = await userRepo.findOne({
        where: { id: userId},
        lock: {mode: 'pessimistic_write'}
      }); 

      if (!userOne) {
        throw new Error('user not found');
      }
      if (userOne.balance < price)  {
        throw new Error('insufficient');
      }

      // const order = new Order();
      // order.item = item;
      // order.price = price;
      // order.user = user;
      // order.userId = userId;
      // await queryRunner.manager.save(order);
      const orderRepoo = queryRunner.manager.getRepository(Order)
      orderRepoo.save({
        item, 
        price,
        userId: userOne.id
      });

      userOne.balance -= price;
      // await queryRunner.manager.save(user);

      await userRepo.save(userOne)

      // await userRepo.update(userOne.balance,userOne)

      await queryRunner.commitTransaction();
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
  
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}
