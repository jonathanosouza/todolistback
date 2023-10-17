import { TodoStatus } from 'src/Entity/todo.entity';

export class CreateTodoDto {
  title: string;
  description: string;
  status: TodoStatus;
}
