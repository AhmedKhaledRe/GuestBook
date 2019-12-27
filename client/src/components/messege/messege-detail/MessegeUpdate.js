import React from 'react';
import { connect } from 'react-redux';

import { UserGuard } from '../../shared/auth/UserGuard';
import { EditableText } from '../../shared/editable/EditableText';
import {  pretifyDate } from '../../../helpers';


import * as actions from '../../../actions';

class MessegeUpdate extends React.Component {

  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFetching: true
    }

    this.updateMessege = this.updateMessege.bind(this);
    this.resetMessegeErrors = this.resetMessegeErrors.bind(this);
    this.verifyMessegeOwner = this.verifyMessegeOwner.bind(this);
  }

  componentWillMount() {
    // Dispatch action
    const messegeId = this.props.match.params.id;

    this.props.dispatch(actions.fetchMessegeById(messegeId));
  }

  componentDidMount() {
    this.verifyMessegeOwner();
  }

  updateMessege(messegeData) {
    const {messege: {_id}, dispatch } = this.props;

    dispatch(actions.updateMessege(_id, messegeData));
  }

  resetMessegeErrors() {
    this.props.dispatch(actions.resetMessegeErrors());
  }

  verifyMessegeOwner() {
    const messegeId = this.props.match.params.id;
    this.setState({isFetching: true});

    return actions.verifyMessegeOwner(messegeId).then(
      () => {
        this.setState({isAllowed: true, isFetching: false})
      },
      () => {
        this.setState({isAllowed: false, isFetching: false})
      });
  }

  render() {
    const { messege, errors } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (messege._id) {
      return (
        <UserGuard isAllowed={isAllowed} isFetching={isFetching}>
          <section id='messegeDetails'>
            <div className='details-section border border-primary rounded'>
              <div className='row'>
                <div className='col-12'>
                  <div className='messege'>
                    <div className="messege-owner m-2">
                      <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                      <span className="mr-0 font-weight-bold">{messege.user && messege.user.username}</span>
                    </div>
                    <div>
                    <div className='m-2 font-weight-normal'>
                    <EditableText  entity={messege}
                                   entityField={'description'}
                                   className={'messege-description'}
                                   updateEntity={this.updateMessege}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   resetErrors={this.resetMessegeErrors} /></div>
                    <div className='m-2 pt-5'>
                      Created at {pretifyDate(messege.createdAt)}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </UserGuard>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    messege: state.messege.data,
    errors: state.messege.errors
  }
}

export default connect(mapStateToProps)(MessegeUpdate)
