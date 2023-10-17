import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoStatus, TodosEntity } from 'src/Entity/todo.entity';
import { CreateTodoDto } from 'src/DTO/todoDTO';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private todosRepository: Repository<TodosEntity>,
  ) {}

  async createOneTodo(createTodoDto: CreateTodoDto): Promise<TodosEntity> {
    const { title, description, status } = createTodoDto;

    const lastTodo = await this.todosRepository
      .createQueryBuilder('todo')
      .orderBy('todo.id', 'DESC')
      .take(1)
      .getOne();

    let newId: number;

    if (lastTodo && lastTodo.id) {
      newId = lastTodo.id + 1;
    } else {
      newId = 1;
    }

    const todo = this.todosRepository.create({
      id: newId,
      title,
      description,
      status,
    });

    return await this.todosRepository.save(todo);
  }

  async getAllTodos(): Promise<TodosEntity[]> {
    try {
      return await this.todosRepository.find();
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async getOneTodo(id: number): Promise<TodosEntity | null> {
    const todo = await this.todosRepository.findOneBy({ id });

    try {
      if (todo === null) {
        throw new InternalServerErrorException('Todo not found');
      } else {
        return todo;
      }
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async removeOneTodo(id: number): Promise<void> {
    const todo = await this.todosRepository.findOneBy({ id });
    try {
      if (todo === null) {
        throw new InternalServerErrorException('Todo not found');
      } else {
        await this.todosRepository.delete(id);
      }
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async filteredTodo(status: TodoStatus): Promise<TodosEntity[]> {
    try {
      return await this.todosRepository.find({
        where: {
          status: status,
        },
      });
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }

  async updateOneTodo(
    id: number,
    updateTodoDto: CreateTodoDto,
  ): Promise<TodosEntity | null> {
    try {
      const todo = await this.todosRepository.findOneBy({ id });

      if (!todo) {
        return null;
      }

      const { title, description, status } = updateTodoDto;

      todo.title = title;
      todo.description = description;
      todo.status = status;

      return await this.todosRepository.save(todo);
    } catch (error) {
      throw new Error('Something went wrong');
    }
  }
}
