import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default {
  dev: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // logging: true,
    synchronize: true,
    // autoLoadEntities: true,
  } as TypeOrmModuleOptions,
};
