import { IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  isCompleted?: boolean;
}

export class UpdateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  isCompleted?: boolean;
}
