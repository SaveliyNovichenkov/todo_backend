import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  status: 'queue' | 'development' | 'done';

  @IsString()
  priority: 'low' | 'medium' | 'maximum';

  @IsNotEmpty()
  dateCompleted: number;

  @IsNumber()
  numeric: number;

  @IsOptional()
  @IsString()
  filePath: string;
}
