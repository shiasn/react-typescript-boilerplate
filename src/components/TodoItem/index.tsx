import * as React from 'react';
import classNames from 'classnames';
// models
import { TodoModel } from '@/models/TodoItem';
// actions
import { TodoActions } from '@/store/actions/todos';
// style
import * as style from './index.less';

namespace TodoItem {
  export interface Props {
    todo: TodoModel;
    toggerTodo: typeof TodoActions.toggerTodo;
    deleteTodo: typeof TodoActions.deleteTodo;
    editTodo: typeof TodoActions.editTodo;
  }

  export interface State {
    editing: boolean;
    content: string;
  }
}

export class TodoItem extends React.Component<TodoItem.Props, TodoItem.State> {
  constructor(props: TodoItem.Props, context?: any) {
    super(props, context);

    this.state = {
      editing: false,
      content: this.props.todo.content
    };

    this.handleComplete = this.handleComplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleComplete(e: React.MouseEvent<HTMLElement>) {
    this.props.toggerTodo({ id: this.props.todo.id });
  }

  handleDelete() {
    this.props.deleteTodo({ id: this.props.todo.id });
  }

  handleEditing() {
    this.setState({
      editing: true
    });
  }

  handleSubmit() {
    this.setState({
      editing: false
    });
    this.props.editTodo({
      id: this.props.todo.id,
      content: this.state.content
    });
  }

  handleSave(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      content: e.target.value
    });
  }

  render() {
    const classes = classNames(
      {
        [style.completed]: this.props.todo.status === 'completed'
      },
      style['todo-item']
    );

    return (
      <div className={classes}>
        <i
          onClick={this.handleComplete}
          className={style['complete-operator']}
        />
        {this.state.editing ? (
          <input
            type="text"
            onChange={this.handleSave}
            value={this.state.content}
            className={style['todo-edit']}
          />
        ) : (
          <p className={style.content}>{this.props.todo.content}</p>
        )}
        <div className={style['button-wrapper']}>
          {this.props.todo.status === 'active' &&
            !this.state.editing && (
              <button onClick={this.handleEditing}>Edit</button>
            )}
          {this.state.editing && (
            <button onClick={this.handleSubmit}>Submit</button>
          )}
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    );
  }
}
