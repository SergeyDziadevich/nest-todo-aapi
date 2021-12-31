import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Todo } from '../entities/todo.entity';

import { TodoCrudService } from '../services/todo-typeorm-crud.service';

@Crud({
  model: {
    type: Todo,
  },
})
@ApiTags('todo')
@Controller('api/todo')
export class TodoCrudController implements CrudController<Todo> {
  constructor(public service: TodoCrudService) {}
}
