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
          host: '0.0.0.0',
          port: Number(process.env.WEBSOCKET_SERVICE_PORT),
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: configService.get('DB_HOST'),
      // port: 3306,
      // username: configService.get('DB_USER'),
      // password: configService.get('DB_PASSWORD'),
      // database: configService.get('DB_NAME'),
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'csrnt',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      name: 'backup',
    }),
    MongooseModule.forRoot('mongodb://localhost/csrnt'),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    TypeOrmModule.forFeature([ItemBackup], 'backup'),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
