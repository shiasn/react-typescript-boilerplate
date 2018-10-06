import * as React from 'react';
// models
import { TodoModel } from '@/models/TodoItem';
// style
import * as style from './index.less';

export const filters = {
  [TodoModel.Filter.SHOW_ALL]: 'All',
  [TodoModel.Filter.SHOW_ACTIVE]: 'Active',
  [TodoModel.Filter.SHOW_COMPLETED]: 'Completed'
};

namespace Footer {
  export interface Props {
    onFilter: (filter: TodoModel.Filter) => any;
  }
  export interface State {
    filter: TodoModel.Filter;
  }
}

export class Footer extends React.Component<Footer.Props, Footer.State> {
  constructor(props: Footer.Props, context?: any) {
    super(props, context);
    this.state = {
      filter: TodoModel.Filter.SHOW_ALL
    };
  }

  renderLink(filter: TodoModel.Filter) {
    return <a onClick={() => this.props.onFilter(filter)}>{filters[filter]}</a>;
  }

  render() {
    return (
      <div className={style.footer}>
        {(Object.keys(filters) as TodoModel.Filter[]).map(key => (
          <button key={key}>{this.renderLink(key)}</button>
        ))}
      </div>
    );
  }
}
