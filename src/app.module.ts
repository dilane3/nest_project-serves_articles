import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ArticlesModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3000, host: "127.0.0.1" },
      },
    ]),
  ],
})
export class AppModule {}
