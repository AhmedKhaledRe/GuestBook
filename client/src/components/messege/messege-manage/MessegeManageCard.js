import React from 'react';
import {  pretifyDate } from '../../../helpers';
import { Link } from 'react-router-dom';

export class MessegeManageCard extends React.Component {

  constructor() {
    super();

    this.state = {
      wantDelete: false
    }
  }

  showDeleteMenu() {
    this.setState({
      wantDelete: true
    });
  }

  closeDeleteMenu() {
    this.setState({
      wantDelete: false
    })
  }

  deleteMessege(messegeId, messegeIndex) {
    this.setState({wantDelete: false});

    this.props.deleteMessegeCb(messegeId, messegeIndex);
  }


  render() {
    const { messege, messegeIndex } = this.props;
    const { wantDelete } = this.state;

    const deleteClass = wantDelete ? 'toBeDeleted' : '';

    return (
      <div className='col-md-4'>
        <div className={`card text-center ${deleteClass}`}>
          <div className='card-block'>
            {messege.description}
          </div>
          <div className='card-footer text-muted'>
            Created at {pretifyDate(messege.createdAt)}
            { !wantDelete &&
              <React.Fragment>
                <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Delete </button>
                <Link className='btn btn-dark m-2' to={{pathname: `/messeges/${messege._id}/edit`, state: { isUpdate: true }}}> Edit </Link>
              </React.Fragment>
            }
            { wantDelete &&
              <div className='delete-menu'>
                Do you confirm?
                <button onClick={() => {this.deleteMessege(messege._id, messegeIndex)}} className='btn btn-danger'> Yes </button>
                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> No </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
