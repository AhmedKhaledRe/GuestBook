import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import Header from './components/shared/Header';
import Login from './components/login/Login';
import { Register } from './components/register/Register';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';



import * as actions from './actions';

import './App.css';

const store = require('./reducers').init();

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className='App'>
          <Header logout={this.logout}/>
          <div className='container'>
            <Switch>
              <Route exact path='/' render={() =>  <Redirect to='/messeges' /> }/>
              <Route exact path='/login' component={Login} />
              <LoggedInRoute exact path='/register' component={Register} />
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
