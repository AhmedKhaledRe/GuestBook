import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import Header from './components/shared/Header';
import Login from './components/login/Login';
import { Register } from './components/register/Register';
import { LoggedInRoute } from './components/shared/auth/LoggedInRoute';

import MessegeListing from './components/messege/messege-listing/MessegeListing';
import MessegeUpdate from './components/messege/messege-detail/MessegeUpdate';
import { MessegeCreate } from './components/messege/messege-create/MessegeCreate';
import { MessegeManage } from './components/messege/messege-manage/MessegeManage';
import { ProtectedRoute } from './components/shared/auth/ProtectedRoute';


import * as actions from './actions';

import './App.scss';

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
          <ToastContainer />
          <Header logout={this.logout}/>
          <div className='container'>
            <Switch>
              <Route exact path='/' render={() =>  <Redirect to='/messeges' /> }/>
              <Route exact path='/messeges' component={MessegeListing} />
              <ProtectedRoute exact path='/messeges/manage' component={MessegeManage} />
              <ProtectedRoute exact path='/messeges/new' component={MessegeCreate} />
              <Route exact path='/messeges/:id/edit' component={MessegeUpdate} />
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
