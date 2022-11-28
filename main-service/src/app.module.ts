import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Item as ItemBackup } from './entities/item.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema, Item } from './schemas/item.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    ClientsModule.register([
      {
        name: 'WEBSOCKET',
        transport: Transport.TCP,
        options: {
          host: process.env.WEBSOCKET_SERVICE_HOST,
          port: Number(process.env.WEBSOCKET_SERVICE_PORT),
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      name: 'backup',
    }),
    MongooseModule.forRoot(process.env.MONGO_DSN),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    TypeOrmModule.forFeature([ItemBackup], 'backup'),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
