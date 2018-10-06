import { createAction } from 'redux-actions';
import { TodoModel } from '@/models/TodoItem';

export namespace TodoActions {
  export enum Type {
    INIT_TODO = 'INIT_TODO',
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    EDIT_TODO = 'EDIT_TODO',
    TOGGER_TODO = 'TOGGER_TODO',
    COMPLETED_ALL = 'COMPLETED_ALL',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED'
  }

  export const initTodo = createAction<TodoModel[]>(Type.INIT_TODO);
  export const addTodo = createAction<PartialPick<TodoModel, 'content'>>(
    Type.ADD_TODO
  );
  export const deleteTodo = createAction<PartialPick<TodoModel, 'id'>>(
    Type.DELETE_TODO
  );
  export const editTodo = createAction<
    PartialPick<TodoModel, 'id' | 'content'>
  >(Type.EDIT_TODO);
  export const toggerTodo = createAction<PartialPick<TodoModel, 'id'>>(
    Type.TOGGER_TODO
  );
  export const completedAll = createAction(Type.COMPLETED_ALL);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

export type TodoActions = Omit<typeof TodoActions, 'Type'>;
