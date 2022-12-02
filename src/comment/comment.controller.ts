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
import { CommentService } from './comment.service';
import { Auth } from '../decorators/auth.decorator';
import { CurrentUser } from '../user/user.decorator';
import { CommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getProjects() {
    return this.commentService.getAllComments();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createProject(@CurrentUser('id') id: string, @Body() dto: CommentDto) {
    return this.commentService.createComment(+id, dto);
  }

  @Get('by-id/:id')
  async getProject(@Param('id') id: string) {
    return this.commentService.byIdComment(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateProject(@Param('id') id: string, @Body() dto: CommentDto) {
    return this.commentService.updateComment(+id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteProject(@Param('id') id: string) {
    return this.commentService.deleteComment(+id);
  }
}
