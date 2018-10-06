import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import { RootState, rootReducer } from './reducers';
import Saga, { Task } from 'redux-saga';

type TStore = Store<RootState> & { runSagaTask: (saga: () => any) => Task };

export function configureStore(
  history: History,
  initialState?: RootState
): TStore {
  const sagaMiddleware = Saga();
  let middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    rootReducer as any,
    initialState as any,
    middleware
  ) as TStore;

  store.runSagaTask = saga => {
    return sagaMiddleware.run(saga);
  };

  if ((module as any).hot) {
    (module as any).hot.accept('@/store/reducers', () => {
      const nextReducer = require('@/store/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
