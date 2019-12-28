import React from 'react';
import {  pretifyDate } from '../../../helpers';

import { Link } from 'react-router-dom';


export function MessegeCard(props) {
  const messege = props.messege;

  return (
    <div className='col-12 mb-2'>
      <Link className='messege-detail-link' to="/messeges/manage">
      <section id='messegeDetails'>
            <div className='details-section border border-primary rounded-pill'>
              <div className='row'>
                <div className='col-12'>
                  <div>
                    <div className="messege-owner mr-5 mt-3">
                      <img className="" src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                      <span className='font-weight-bold'>{messege.user && messege.user.username}</span>
                    </div>
                    <div>
                    <h4 className='m-2 ml-5 font-weight-normal'>{messege.description}</h4>
                    </div>
                    <div className='m-2 ml-5 pt-5 flow-text grey-text text-darken-1'>
                      Created at {pretifyDate(messege.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </Link>
    </div>
  )
}
