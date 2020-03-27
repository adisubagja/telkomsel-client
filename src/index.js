import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}


let authorization = {
  payload: null,
  isLoggedIn:false
};

if(localStorage.getItem('token')) {
  authorization = {...authorization, payload: JSON.parse(localStorage.getItem('token')), isLoggedIn:true}

}
const store = createStore(reducers,{auth:authorization}, applyMiddleware(...middleware))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);