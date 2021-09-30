import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [DatabaseModule, UserModule, PostModule],
    exports: [DatabaseModule, UserModule, PostModule],
})
export class MicroserviceModule {}
