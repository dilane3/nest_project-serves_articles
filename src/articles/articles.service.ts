import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

type Article = {
  id: number;
  title: string;
  description: string;
  author: {
    id: number;
    name: string;
  };
};

@Injectable()
export class ArticlesService {
  private client: ClientProxy
  private readonly articles = [
    {
      id: 1,
      title: 'Article 1',
      description: 'This is article 1',
      authorId: 1
    },{
      id: 2,
      title: 'Article 2',
      description: 'This is article 2',
      authorId: 2
    },
    {
      id: 3,
      title: 'Article 3',
      description: 'This is article 3',
      authorId: 3
    }
  ]

  constructor () {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 3000,
        host: "127.0.0.1"
      }
    })
  }

  findAll() {
    return this.client
      .send<{ 
        id: number,
        title: string,
        description: string,
        author: {
          id: number,
          name: string
        }
      }[]>({ cmd: "findOne" }, { articles: this.articles })
  }
}
