import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  isCompleted?: boolean;
}

export class UpdateTodoDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  isCompleted?: boolean;
}
