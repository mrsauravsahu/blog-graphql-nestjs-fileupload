import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './modules/person/person.module';
import { PersonResolver } from './modules/person/person.resolver';

@Module({
  imports: [
    PersonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      playground: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
