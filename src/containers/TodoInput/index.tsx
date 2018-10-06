import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
// actions
import { TodoActions } from '@/store/actions/todos';
// style
import * as style from './index.less';

type Actions = Pick<TodoActions, 'addTodo'>;

const todoActions: Actions = {
  addTodo: TodoActions.addTodo
};

namespace TodoInput {
  export interface Props {
    actions?: Actions;
  }
  export interface State {
    todoContent: string;
  }
}

@connect(
  null,
  (dispatch: Dispatch): TodoInput.Props => ({
    actions: bindActionCreators(todoActions, dispatch)
  })
)
export class TodoInput extends React.Component<
  TodoInput.Props,
  TodoInput.State
> {
  constructor(props: TodoInput.Props) {
    super(props);

    this.state = {
      todoContent: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSaveTodo = this.handleSaveTodo.bind(this);
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      todoContent: e.target.value.trim()
    });
  }

  handleSaveTodo(): void {
    const { todoContent } = this.state;
    if (todoContent) {
      this.props.actions.addTodo({ content: todoContent });
    }
  }

  render() {
    return (
      <div className={style.increase}>
        <input
          type="text"
          placeholder="Enter a Todo"
          defaultValue={this.state.todoContent}
          onInput={this.handleInput}
        />
        <button onClick={this.handleSaveTodo}>Save</button>
      </div>
    );
  }
}
