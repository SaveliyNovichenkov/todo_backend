import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../todo/todo.entity';
import { ProjectEntity } from './project.entity';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [TypeOrmModule.forFeature([ProjectEntity, TodoEntity])],
})
export class ProjectModule {}
