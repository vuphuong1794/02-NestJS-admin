import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LikesModule } from './modules/likes/likes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemOptionsModule } from './modules/menu.item.options/menu.item.options.module';
import { MenuItemsModule } from './modules/menu.items/menu.items.module';
import { MenusModule } from './modules/menus/menus.module';
import { OrderDetailModule } from './modules/order.detail/order.detail.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    UsersModule,
    LikesModule,
    MenuItemOptionsModule,
    MenuItemsModule,
    MenusModule,
    OrderDetailModule,
    OrdersModule,
    RestaurantsModule,
    ReviewsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        return {
          uri,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('✅ MongoDB Connection Established Successfully');
            });
            connection.on('error', (error) => {
              console.error('❌ MongoDB Connection Error:', error);
            });
            connection.on('disconnected', () => {
              console.warn('⚠️ MongoDB Disconnected');
            });
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}