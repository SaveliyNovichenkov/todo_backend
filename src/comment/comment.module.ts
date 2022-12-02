import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../todo/todo.entity';
import { CommentEntity } from './comment.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [TypeOrmModule.forFeature([TodoEntity, CommentEntity, UserEntity])],
})
export class CommentModule {}
