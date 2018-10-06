import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
// models
import { TodoModel } from '@/models/TodoItem';
import { RootState } from '@/store/reducers';
// actions
import { TodoActions } from '@/store/actions/todos';
// components
import { TodoItem } from '@/components/TodoItem';
// style
import * as style from './index.less';

type Actions = Pick<TodoActions, 'toggerTodo' | 'editTodo' | 'deleteTodo'>;

const todoActions: Actions = {
  toggerTodo: TodoActions.toggerTodo,
  editTodo: TodoActions.editTodo,
  deleteTodo: TodoActions.deleteTodo
};

namespace TodoList {
  export interface Props {
    actions: Actions;
    todos: TodoModel[];
  }
}

@connect(
  (state: RootState): Pick<TodoList.Props, 'todos'> => {
    const todos = (state.todos.asMutable() as any).reverse();
    return { todos };
  },
  (dispatch: Dispatch): Pick<TodoList.Props, 'actions'> => ({
    actions: bindActionCreators(todoActions, dispatch)
  })
)
export class TodoList extends React.Component<Partial<TodoList.Props>> {
  constructor(props: TodoList.Props, context?: any) {
    super(props, context);
  }
  render() {
    return (
      <div className={style.list}>
        {(this.props.todos as any).map((todo: TodoModel) => (
          <TodoItem
            deleteTodo={this.props.actions.deleteTodo}
            toggerTodo={this.props.actions.toggerTodo}
            editTodo={this.props.actions.editTodo}
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>
    );
  }
}
