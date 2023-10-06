import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'hubla',
      entities: [SellEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([SellEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
