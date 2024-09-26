import { Container } from 'inversify';
import { ProductRepository } from '@/app/repository/product-repository';
import { ProductService } from '@/app/service/product-service';
import { ProductController } from '@/app/controller/product-controller';
import 'reflect-metadata';
// import { BaseService } from '@/app/service/base-service';
// import { BaseRepository } from '@/app/repository/base-repository';
// import { BaseController } from '@/app/controller/base-controller';

const container = new Container();

// container.bind<BaseService>(BaseService).toSelf();
// container.bind<BaseRepository>(BaseRepository).toSelf();
// container.bind<BaseController>(BaseController).toSelf();
container.bind<ProductService>(ProductService).toSelf();
container.bind<ProductRepository>(ProductRepository).toSelf();
container.bind<ProductController>(ProductController).toSelf();

export { container };