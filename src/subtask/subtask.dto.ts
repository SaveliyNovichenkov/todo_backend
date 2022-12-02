import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SubtaskDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  status: 'queue' | 'development' | 'done';
}
