import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../project/project.entity';
import { UserEntity } from './user.entity';
import { CommentEntity } from '../comment/comment.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProjectEntity, CommentEntity]),
  ],
})
export class UserModule {}
