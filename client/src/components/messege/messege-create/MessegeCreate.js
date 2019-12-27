import React from 'react';
import MessegeCreateForm from './MessegeCreateForm';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../actions';

export class MessegeCreate extends React.Component {

  constructor() {
    super();

    this.state = {
      errors: [],
      redirect: false
    }


    this.createMessege = this.createMessege.bind(this);
  }

  createMessege(messegeData) {
    actions.createMessege(messegeData).then(
      (messege) => this.setState({redirect: true}),
      (errors) => this.setState({errors}))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/messeges'}}/>
    }

    return (
      <section id='newMessege'>
        <div className='bwm-form'>
          <div className='row text-center'>
            <div className='col-12'>
              <h1 className='page-title'>Create Messege</h1>
              <MessegeCreateForm submitCb={this.createMessege}
                                errors={this.state.errors}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
