import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_URL),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
