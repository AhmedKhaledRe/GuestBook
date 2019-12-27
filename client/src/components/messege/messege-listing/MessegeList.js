import React from 'react';
import { MessegeCard } from './MessegeCard';

export class MessegeList extends React.Component {

  renderMesseges() {
    return this.props.messeges.map((messege, index) => {
      return (
          <MessegeCard key={index}
                      messege={messege}/>
        )
    });
  }
  render() {
    return (
      <div className="row">
        {this.renderMesseges()}
      </div>
    )
  }
}
