import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';
import { UserDto } from './user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async getAll() {
    return await this.userRepository.find({
      relations: {
        projects: true,
      },
    });
  }

  async byId(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        projects: true,
        comments: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!user) throw new NotFoundException('Пользователь не найден!');
    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const user = await this.byId(id);

    const isSameUser = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (dto.password) {
      const salt = await genSalt(10);
      user.password = await hash(dto.password, salt);
    }

    user.email = dto.email;
    user.name = dto.name;
    user.avatarPath = dto.avatarPath;
    return this.userRepository.save(user);
  }

  async byIdProjectsFind(id: number) {
    const projects = this.projectRepository.find({
      where: {
        user: {
          id: id,
        },
      },
    });
    if (!projects) throw new NotFoundException('Задание не найдено!');
    return projects;
  }

  async projectsFind() {
    return this.projectRepository.find({
      relations: {
        user: true,
      },
    });
  }
}
