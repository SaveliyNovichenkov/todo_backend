import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  name: string;
}
