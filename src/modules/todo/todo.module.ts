import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from './entities/todo.entity';
import { TodoCrudController } from './controller/todo-crud.controller';
import { TodoCrudService } from './services/todo-typeorm-crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoCrudController],
  providers: [TodoCrudService],
})
export class TodoModule {}
