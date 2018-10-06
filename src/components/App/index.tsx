import * as React from 'react';
import { RouteComponentProps } from 'react-router';
// models
import { TodoModel } from '@/models/TodoItem';
// components
import { TodoList } from '@/containers/TodoList';
import { TodoInput } from '@/containers/TodoInput';
import { Footer } from '@/components/Footer';
// style
import * as style from './index.less';

export class App extends React.Component<RouteComponentProps<void>> {
  constructor(props: RouteComponentProps<void>, context?: any) {
    super(props, context);
    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(filter: TodoModel.Filter) {
    this.props.history.push(`/${filter}`);
  }

  render() {
    return (
      <div className={style.todo}>
        <h1>Todo</h1>
        <TodoInput />
        <TodoList />
        <Footer onFilter={this.onFilter} />
      </div>
    );
  }
}
