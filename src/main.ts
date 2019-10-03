import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import conf from './environment/config'
import { ExceptionHandlerFilter } from './common/exception-handler.filter';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(helmet());
  app.useGlobalFilters(new ExceptionHandlerFilter());

  await app.listen(conf.Production.PORT);
  console.log(`Server is leasning on PORT  :  ${conf.Production.PORT}`);
}
bootstrap();
