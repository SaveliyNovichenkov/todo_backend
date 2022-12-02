import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../user/user.decorator';
import { ProjectDto } from './project.dto';
import { UserDto } from '../user/user.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects() {
    return this.projectService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createProject(@CurrentUser('id') id: string, @Body() dto: ProjectDto) {
    return this.projectService.create(+id, dto);
  }

  @Get('by-id/:id')
  async getProject(@Param('id') id: string) {
    return this.projectService.byId(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateProject(@Param('id') id: string, @Body() dto: ProjectDto) {
    return this.projectService.update(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(+id);
  }

  @Get('find/todos')
  async projects() {
    return this.projectService.todosFind();
  }
}
