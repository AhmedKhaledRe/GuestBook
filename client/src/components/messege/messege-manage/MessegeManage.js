import React from 'react';
import * as actions from '../../../actions';
import { Link } from 'react-router-dom';
import { MessegeManageCard } from './MessegeManageCard';
import { ToastContainer, toast } from 'react-toastify';

export class MessegeManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userMesseges: [],
      errors: [],
      isFetching: false
    }

    this.deleteMessege = this.deleteMessege.bind(this);
  }

  componentWillMount() {
    this.setState({isFetching: true});

    actions.getUserMesseges().then(
      userMesseges => this.setState({userMesseges, isFetching: false})
      )}

  renderMessegeCards(messeges) {
    return messeges.map((messege, index) =>
     <MessegeManageCard key={index}
                       messege={messege}
                       messegeIndex={index}
                       deleteMessegeCb={this.deleteMessege} />);
  }

  deleteMessege(messegeId, messegeIndex) {
    actions.deleteMessege(messegeId).then(
      () => this.deleteMessegeFromList(messegeIndex),
      errors => toast.error(errors[0].detail))
}

  deleteMessegeFromList(messegeIndex) {
    const userMesseges = this.state.userMesseges.slice();
    userMesseges.splice(messegeIndex, 1);

    this.setState({userMesseges});
  }

  render() {
    const { userMesseges, isFetching } = this.state;

    return (
      <section id='userMesseges'>
      <ToastContainer />
        <h1 className='page-title'>My Messeges</h1>
        <div className='row'>
        {this.renderMessegeCards(userMesseges)}
        </div>
        { !isFetching && userMesseges.length === 0 &&
          <div className='alert alert-warning'>
            You dont have any messeges currenty created. 
            <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/messeges/new'>Create Messege</Link>
          </div>
        }
      </section>
    )
  }
}
