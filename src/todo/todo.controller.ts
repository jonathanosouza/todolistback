import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoStatus } from 'src/Entity/todo.entity';
import { CreateTodoDto } from 'src/DTO/todoDTO';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos() {
    const todos = this.todoService.getAllTodos();
    return todos;
  }

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createOneTodo(createTodoDto);
  }

  @Get('id/:id')
  getOneTodo(@Param('id') id: number) {
    const todos = this.todoService.getOneTodo(id);
    return todos;
  }

  @Get('/status/:status')
  getFilteredTodo(@Param('status') status: TodoStatus) {
    const todos = this.todoService.filteredTodo(status);
    return todos;
  }

  @Delete('delete/:id')
  deleteOneTodo(@Param('id') id: number) {
    const todos = this.todoService.removeOneTodo(id);
    return todos;
  }

  @Put('update/:id')
  updateOneTodo(@Param('id') id: number, @Body() updateTodoDto: CreateTodoDto) {
    return this.todoService.updateOneTodo(id, updateTodoDto);
  }
}
