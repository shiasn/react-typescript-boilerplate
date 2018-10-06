import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore } from '@/store';
import App from './App';
import mock from '@/mock';

import { fetchTodos, watchTodoActions } from '@/store/sagas';

const history = createBrowserHistory();
const store = configureStore(history);

if (process.env.MOCK) {
  mock();
  store.runSagaTask(watchTodoActions);
  store.runSagaTask(fetchTodos);
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);
