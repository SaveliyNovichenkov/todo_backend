import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { ProjectDto } from './project.dto';
import { ProjectEntity } from './project.entity';
import { TodoEntity } from '../todo/todo.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async getAll() {
    return await this.projectRepository.find({
      relations: {
        todos: true,
      },
    });
  }

  async create(userId: number, dto: ProjectDto) {
    const newProject = this.projectRepository.create({
      description: dto.description,
      name: dto.name,
      user: { id: userId },
    });
    return this.projectRepository.save(newProject);
  }

  async byId(id: number) {
    const project = this.projectRepository.findOne({
      relations: {
        todos: true,
      },
      where: {
        id,
      },
    });
    if (!project) throw new NotFoundException('Проект не найден!');
    return project;
  }

  async update(id: number, dto: ProjectDto) {
    const project = await this.byId(id);
    project.description = dto.description;
    project.name = dto.name;
    return this.projectRepository.save(project);
  }

  async deleteProject(id: number) {
    return this.projectRepository.delete({ id });
  }

  async todosFind() {
    return this.todoRepository.find({});
  }
}
