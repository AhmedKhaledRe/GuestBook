import React from 'react';
import { MessegeList } from './MessegeList';
import { connect } from 'react-redux';

import * as actions from '../../../actions';


class MessegeListing extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchMesseges());
  }

  render() {
    return (
      <section id="messegeListing">
        <h1 className="page-title">Messeges</h1>
        <MessegeList messeges={this.props.messeges} />
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    messeges: state.messeges.data
  }
}

export default connect(mapStateToProps)(MessegeListing)
