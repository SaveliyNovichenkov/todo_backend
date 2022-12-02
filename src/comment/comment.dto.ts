import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsNumber()
  todoId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  parentId: number;
}
