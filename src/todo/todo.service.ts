import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm/repository/Repository';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor() {}
  @InjectRepository(TodoEntity)
  private readonly todoRepository: Repository<TodoEntity>;

  async getAllTodos() {
    return await this.todoRepository.find({
      relations: {
        project: true,
        comments: true,
        subtasks: true,
      },
    });
  }

  async createTodo(projectId: number, dto: TodoDto) {
    const newComment = this.todoRepository.create({
      description: dto.description,
      name: dto.name,
      title: dto.title,
      status: dto.status,
      priority: dto.priority,
      dateCompleted: dto.dateCompleted,
      numeric: dto.numeric,
      filePath: dto.filePath,
      project: { id: projectId },
    });
    return this.todoRepository.save(newComment);
  }

  async byIdTodo(id: number) {
    const todo = this.todoRepository.findOne({
      relations: {
        project: true,
        subtasks: true,
        comments: true,
      },
      where: {
        id,
      },
    });
    if (!todo) throw new NotFoundException('Задание не найдено!');
    return todo;
  }

  async updateTodo(id: number, dto: TodoDto) {
    const todo = await this.byIdTodo(id);
    (todo.description = dto.description),
      (todo.name = dto.name),
      (todo.title = dto.title),
      (todo.status = dto.status),
      (todo.priority = dto.priority),
      (todo.dateCompleted = dto.dateCompleted),
      (todo.filePath = dto.filePath);
    todo.numeric = dto.numeric;
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number) {
    return this.todoRepository.delete({ id });
  }
}
