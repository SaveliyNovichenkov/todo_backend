import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm/repository/Repository';
import { SubtaskEntity } from './subtask.entity';
import { TodoEntity } from '../todo/todo.entity';
import { TodoDto } from '../todo/todo.dto';
import { SubtaskDto } from './subtask.dto';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(SubtaskEntity)
    private readonly subtaskRepository: Repository<SubtaskEntity>,
  ) {}

  async getAllSubtasks() {
    return await this.subtaskRepository.find();
  }

  async createSubtask(todoId: number, dto: SubtaskDto) {
    const subtask = this.subtaskRepository.create({
      description: dto.description,
      name: dto.name,
      status: dto.status,
      todo: { id: todoId },
    });
    return this.subtaskRepository.save(subtask);
  }

  async byIdSubtask(id: number) {
    const subtask = this.subtaskRepository.findOne({
      relations: {
        todo: true,
      },
      select: {
        todo: {
          id: true,
        },
      },
      where: {
        id,
      },
    });
    if (!subtask) throw new NotFoundException('Подзадача не найдена!');
    return subtask;
  }

  async updateSubtask(id: number, dto: SubtaskDto) {
    const subtask = await this.byIdSubtask(id);
    subtask.description = dto.description;
    subtask.name = dto.name;
    subtask.status = dto.status;
    return this.subtaskRepository.save(subtask);
  }

  async deleteSubtask(id: number) {
    return this.subtaskRepository.delete({ id });
  }
}
