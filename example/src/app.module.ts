import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OttomanModule } from 'nestjs-ottoman';
import { DefaultModel } from './collections/foo.collection';

@Module({
  imports: [
    OttomanModule.forRoot({
      connectionString: 'couchbase://localhost/bubububu@adminadmin:adminadmin',
    }),
    OttomanModule.forFeature([DefaultModel]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
