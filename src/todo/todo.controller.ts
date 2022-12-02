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
import { TodoService } from './todo.service';
import { Auth } from '../decorators/auth.decorator';
import { TodoDto } from './todo.dto';
import { ProjectDto } from '../project/project.dto';
import { CurrentUser } from '../user/user.decorator';
import { CommentDto } from '../comment/comment.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getProjects() {
    return this.todoService.getAllTodos();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(':id')
  @Auth()
  async createProject(@Param('id') id: string, @Body() dto: TodoDto) {
    return this.todoService.createTodo(+id, dto);
  }

  @Get('by-id/:id')
  async getProject(@Param('id') id: string) {
    return this.todoService.byIdTodo(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateProject(@Param('id') id: string, @Body() dto: TodoDto) {
    return this.todoService.updateTodo(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteProject(@Param('id') id: string) {
    return this.todoService.deleteTodo(+id);
  }
}
