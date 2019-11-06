import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers/index';
import Router from './Router/index';
// require('./bootstrap');
// require('./style.css');

// const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render(){
  return(
    //  <Provider >
          <Router />
      // </Provider>
  )
  }
}
export default App