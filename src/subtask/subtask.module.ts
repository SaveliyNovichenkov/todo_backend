import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { TodoEntity } from '../todo/todo.entity';
import { SubtaskEntity } from './subtask.entity';

@Module({
  controllers: [SubtaskController],
  providers: [SubtaskService],
  imports: [TypeOrmModule.forFeature([TodoEntity, SubtaskEntity])],
})
export class SubtaskModule {}
