import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';


@Module({
  imports: [MoviesModule, MongooseModule.forRoot('mongodb+srv://hanachi:tzCGQrqFIFqGVZwg@cluster0.udr3v.mongodb.net/Movies?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
