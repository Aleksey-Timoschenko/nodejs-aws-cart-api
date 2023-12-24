import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { Cart, CartItem } from './cart/entities';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '',
      port: Number(process.env.DB_PORT) || 5432,
      password: process.env.DB_PASS || '',
      username: process.env.DB_USER || '',
      entities: [Cart, CartItem],
      database: process.env.DB_NAME || '',
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
