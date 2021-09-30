import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'config/.development.env' });

export default {
    dev: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'test',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: false,
        // logging: ['query', 'error'],
        // autoLoadEntities: true,
    } as TypeOrmModuleOptions,
};
