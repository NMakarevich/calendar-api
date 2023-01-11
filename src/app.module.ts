import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig.options), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
