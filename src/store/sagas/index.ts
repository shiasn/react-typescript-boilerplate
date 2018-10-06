import * as Saga from 'redux-saga';
import { TodoActions } from '@/store/actions/todos';
import { fetchTodoList, postTodo } from '@/http';

export function* fetchTodos() {
  const todos = yield fetchTodoList();
  yield Saga.effects.put(TodoActions.initTodo(todos || []));
}

export function* watchTodoActions() {
  yield Saga.effects.takeEvery('*', function*(action) {
    const { type } = action;
    if (type === TodoActions.Type.ADD_TODO) {
      const state = yield Saga.effects.select();
      yield postTodo(state.todos[state.todos.length - 1]);
    }
    if (type === TodoActions.Type.EDIT_TODO) {
      const editAction = yield Saga.effects.take(TodoActions.Type.EDIT_TODO);
      console.log(editAction);
      // axios.patch('/todos', editAction.payload)
      //   .then(res => {
      //     console.log(res);
      //   })
    }
  });
}
