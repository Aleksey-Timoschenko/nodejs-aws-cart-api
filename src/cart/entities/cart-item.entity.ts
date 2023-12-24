import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Cart } from './cart.entity';

@Entity('cart-item')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  productId: string;

  @Column({ name: 'count', type: 'integer', default: 0 })
  count?: number;

  @JoinColumn({ name: 'cart_id' })
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  cart: Cart;
}
