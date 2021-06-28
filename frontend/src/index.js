import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'

import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
