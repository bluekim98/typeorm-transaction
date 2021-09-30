import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({ imports: [UserModule, PostModule] })
export class V0R1Module {}
