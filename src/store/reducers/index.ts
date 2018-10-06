import { combineReducers } from 'redux';
import { RootState } from './state';
import { todoReducer } from './todos';
import { routerReducer } from 'react-router-redux';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  todos: todoReducer as any,
  router: routerReducer as any
});
