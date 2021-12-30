import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from '../dto/dto';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all todos', type: [Todo] })
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 200, description: 'Get todo by id', type: Todo })
  async getOneAction(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);

    if (todo === undefined) {
      // throw new NotFoundException(`Todo with id = ${id} not exist`);
      throw new HttpException(
        `Todo with id = ${id} not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Create todo', type: Todo })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiBody({ type: CreateTodoDto })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  createAction(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    if (createTodoDto.isCompleted !== undefined) {
      todo.isCompleted = createTodoDto.isCompleted;
    }

    return this.todoService.create(todo);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update todo', type: Todo })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiBody({ type: UpdateTodoDto })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  async updateAction(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | { error: boolean }> {
    const todo = await this.todoService.findOne(id);

    if (todo === undefined) {
      throw new NotFoundException(`Todo with id = ${id} not found`);
    }

    const updatedTodo = { ...todo, ...updateTodoDto };

    return this.todoService.update(updatedTodo);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete todo' })
  @ApiResponse({ status: 404, description: 'Not found' })
  deleteAction(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
