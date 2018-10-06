import * as Mock from 'mockjs';
import { TodoModel } from '@/models/TodoItem';
import './random';
const data = Mock.mock(require('./todos.json'));

export default function() {
  Mock.mock('/todos', 'get', () => {
    return data.todos;
  });

  Mock.mock('/todos', 'post', (req: Request) => {
    if (req.body) {
      const todo = JSON.parse(req.body.toString());
      data.todos.push(todo);
      return todo;
    }
  });

  Mock.mock(/\/todos\/\d/, 'patch', (req: Request) => {
    const id = Number(req.url.split('/')[2]);
    const todo = data.todos.find((item: TodoModel) => item.id === id);
    if (req.body) {
      const patchData = JSON.parse(req.body.toString());
      console.log('patch data', patchData);
      Object.assign(todo, patchData);
    }
    return todo;
  });

  Mock.mock(/\/todos\/\d/, 'delete', (req: Request) => {
    const id = Number(req.url.split('/')[2]);
    const todo = data.todos.find((item: TodoModel) => item.id === id);

    if (todo) {
      data.todos.splice(data.todos.indexOf(todo), 1);
    }
    return true;
  });

  Mock.mock(/\/todos/, 'delete', (req: Request) => {
    data.todos = [];
    return true;
  });
}
