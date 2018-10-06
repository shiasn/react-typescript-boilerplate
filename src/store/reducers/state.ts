import { TodoModel } from '@/models/TodoItem';
import { RouterState } from 'react-router-redux';
import { Immutable } from 'seamless-immutable';

export namespace RootState {
  export type TodoState = Immutable<TodoModel>;
}

export interface RootState {
  todos: RootState.TodoState;
  router: RouterState;
}
