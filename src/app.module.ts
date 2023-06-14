import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import envConfig from './env/env.config';
import { Rating } from './entities/rating.entity';
import { Movies } from './entities/movies.entity';

const DB_CONFS = envConfig().DB_CONFIG;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        return DB_CONFS;
      },
    }),
    TypeOrmModule.forFeature([Rating, Movies]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
