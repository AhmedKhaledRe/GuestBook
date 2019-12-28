import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmTextArea } from '../../shared/form/BwmTextArea';
import { BwmResError } from '../../shared/form/BwmResError';
// import { required, minLength4 } from 'components/shared/form/validators';

const MessegeCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
    
       <Field
        name="description"
        type="text"
        label='Description'
        rows='6'
        className='form-control border ml-5'
        component={BwmTextArea}
      />

      <button className='btn btn-bwm btn-form border rounded-pill btn-dark' type="submit" disabled={!valid || pristine || submitting}>
        Create Messege
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'messegeCreateForm',
})(MessegeCreateForm)
