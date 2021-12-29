import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Todo } from '../todo/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto';

// GetOne
// GetMany
// Post (Create or Update)
// Delete (Delete)
@Controller('api/todo')
export class TodoController {
  constructor() {}

  @Get()
  getAllAction(): string {
    return 'Get all todo';
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): string {
    return `Get one todo ${id}`;
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  createAction(@Body() todo: CreateTodoDto): CreateTodoDto {
    console.log(todo);
    return todo;
  }

  @Put(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  updateAction(
    @Param('id') id: string,
    @Body() todo: UpdateTodoDto,
  ): UpdateTodoDto {
    console.log('Search by Id', id);
    console.log(todo);
    return todo;
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): string {
    return `Delete todo ${id}`;
  }
}
