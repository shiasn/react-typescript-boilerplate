import * as React from 'react';
import { render } from 'react-dom';

render(<div>Init</div>, document.querySelector('#root'));

// import * as React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
// import { configureStore } from '@/store';
// import rootSaga from '@/store/sagas';

// const history = createBrowserHistory();
// const { store, runSaga } = configureStore(history);

// console.log(rootSaga);

// runSaga(rootSaga);

// function App() {
//   return <div>asdf</div>;
// }

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.querySelector('#root')
// );
