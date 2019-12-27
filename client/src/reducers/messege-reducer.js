import { FETCH_MESSEGE_BY_ID_SUCCESS,
         FETCH_MESSEGE_BY_ID_INIT,
         FETCH_MESSEGES_SUCCESS,
         FETCH_MESSEGES_INIT,
         FETCH_MESSEGES_FAIL,
         UPDATE_MESSEGE_SUCCESS,
         UPDATE_MESSEGE_FAIL,
         RESET_MESSEGE_ERRORS } from '../actions/types';

const INITIAL_STATE = {
  messeges: {
    data: [],
    errors: []
  },
  messege: {
    data: {},
    errors: []
  }
}

export const messegeReducer = (state = INITIAL_STATE.messeges, action) => {
  switch(action.type) {
    case FETCH_MESSEGES_INIT:
      return {...state, data: [], errors: []};
    case FETCH_MESSEGES_SUCCESS:
      return {...state, data: action.messeges};
    case FETCH_MESSEGES_FAIL:
      return Object.assign({}, state, {errors: action.errors, data: []});
    default:
      return state;
  }
}


export const selectedMessegeReducer = (state = INITIAL_STATE.messege, action) => {
  switch(action.type) {
    case FETCH_MESSEGE_BY_ID_INIT:
      return {...state, data: {}};
    case FETCH_MESSEGE_BY_ID_SUCCESS:
      return Object.assign({}, state, { data: action.messege});
    case UPDATE_MESSEGE_SUCCESS:
      return {...state, data: action.messege};
    case UPDATE_MESSEGE_FAIL:
      return {...state, errors: action.errors};
    case RESET_MESSEGE_ERRORS:
      return {...state, errors: []};
    default:
      return state;
  }
}
