import axios from 'axios';
import * as moment from 'moment';
import { TodoModel } from '@/models/TodoItem';

function getDateTime(): string {
  return moment().format('YYYY-MM-DD hh:mm:ss');
}

export async function fetchTodoList(): Promise<TodoModel[]> {
  const { data } = await axios.get('/todos');
  return data;
}

export async function postTodo(todo: TodoModel): Promise<TodoModel> {
  const { data } = await axios.post('/todos', todo);
  return data;
}

export async function patchTodo(todo: Partial<TodoModel>): Promise<TodoModel> {
  todo.updateTime = getDateTime();
  const { id } = todo;

  delete todo.id;

  const { data } = await axios.patch('/todos/' + id, todo);

  return data;
}

export async function deleteTodo(id: number): Promise<TodoModel> {
  const { data } = await axios.delete('/todos/' + id);
  return data;
}

export async function deleteAll() {
  const { data } = await axios.delete('/todos');
  return data;
}
