import * as React from 'react';

import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import { App as TodoApp } from '@/components/App';

export default hot(module)(() => (
  <Switch>
    <Route path="/" component={TodoApp} />
  </Switch>
));
