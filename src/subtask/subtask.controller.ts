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
import { SubtaskService } from './subtask.service';
import { Auth } from '../decorators/auth.decorator';
import { SubtaskDto } from './subtask.dto';

@Controller('subtask')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Get()
  async getSubtasks() {
    return this.subtaskService.getAllSubtasks();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(':id')
  @Auth()
  async createProject(@Param('id') id: string, @Body() dto: SubtaskDto) {
    return this.subtaskService.createSubtask(+id, dto);
  }

  @Get('by-id/:id')
  async getSubtask(@Param('id') id: string) {
    return this.subtaskService.byIdSubtask(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateSubtask(@Param('id') id: string, @Body() dto: SubtaskDto) {
    return this.subtaskService.updateSubtask(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteSubtask(@Param('id') id: string) {
    return this.subtaskService.deleteSubtask(+id);
  }
}
