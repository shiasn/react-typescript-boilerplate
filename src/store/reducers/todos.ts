import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { TodoActions } from '@/store/actions/todos';
import { TodoModel } from '@/models/TodoItem';
import * as SeamlessImmutable from 'seamless-immutable';
import * as moment from 'moment';

type Todo = SeamlessImmutable.ImmutableObject<TodoModel>;

function getDateTime(): string {
  return moment().format('YYYY-MM-DD hh:mm:ss');
}

export const todoReducer = handleActions<
  RootState.TodoState,
  TodoModel & TodoModel[]
>(
  {
    [TodoActions.Type.INIT_TODO]: (state: any, action) => {
      if (action.payload) {
        return SeamlessImmutable(action.payload).concat(state);
      }
      return state;
    },
    [TodoActions.Type.ADD_TODO]: (state: any, action) => {
      if (action.payload) {
        const nextID = state.length
          ? state.reduce(
              (max: number, todo: Todo) => Math.max(todo.id || 0, max),
              0
            ) + 1
          : 0;

        return state.set(state.length, {
          id: nextID,
          status: 'active',
          content: action.payload.content,
          updateTime: getDateTime()
        });
      }

      return state;
    },
    [TodoActions.Type.DELETE_TODO]: (state: any, action) => {
      if (action.payload) {
        const { id } = action.payload;
        return state.filter((todo: Todo) => todo.id !== id);
      }
      return state;
    },
    [TodoActions.Type.EDIT_TODO]: (state: any, action) => {
      if (action.payload) {
        const { id, content } = action.payload;
        const todo: Todo = state.find((item: Todo) => item.id === id);

        const newTodo = todo.merge({
          id,
          content,
          updateTime: getDateTime()
        });

        return state.set(state.indexOf(todo), newTodo);
      }
      return state;
    },
    [TodoActions.Type.TOGGER_TODO]: (state: any, action) => {
      if (action.payload) {
        const { id } = action.payload;
        const todo: Todo = state.find((item: Todo) => item.id === id);
        const newTodo: Todo = todo.merge({
          status: todo.status === 'completed' ? 'active' : 'completed',
          updateTime: getDateTime()
        });

        return state.set(state.indexOf(todo), newTodo);
      }
      return state;
    },
    [TodoActions.Type.COMPLETED_ALL]: (state: any) => {
      return state.flatMap((todo: Todo) => {
        return todo.merge({
          status: 'completed',
          updateTime: getDateTime()
        });
      });
    },
    [TodoActions.Type.CLEAR_COMPLETED]: (state: any) => {
      return state.flatMap(
        (todo: Todo): [] | TodoModel => {
          if (todo.status === 'completed') {
            return [];
          }
          return todo;
        }
      );
    }
  },
  SeamlessImmutable([])
);
