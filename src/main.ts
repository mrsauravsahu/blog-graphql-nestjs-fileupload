import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 8080;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`App running at ${await app.getUrl()}`);
}
bootstrap();
