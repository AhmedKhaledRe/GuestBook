import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

import { FETCH_MESSEGE_BY_ID_SUCCESS,
         FETCH_MESSEGE_BY_ID_INIT,
         FETCH_MESSEGES_SUCCESS,
         FETCH_MESSEGES_INIT,
         FETCH_MESSEGES_FAIL,
         LOGIN_SUCCESS,
         LOGIN_FAILURE,
         LOGOUT,
         UPDATE_MESSEGE_SUCCESS,
         UPDATE_MESSEGE_FAIL,
         RESET_MESSEGE_ERRORS} from './types';

const axiosInstance = axiosService.getInstance();

export const verifyMessegeOwner = (messegeId) => {
  return axiosInstance.get(`/messeges/${messegeId}/verify-user`);
}


// MESSEGE ACTIONS ---------------------------

const fetchMessegeByIdInit = () => {
  return {
    type: FETCH_MESSEGE_BY_ID_INIT
  }
}

const fetchMessegeByIdSuccess = (messege) => {
  return {
    type: FETCH_MESSEGE_BY_ID_SUCCESS,
    messege
  }
}

const fetchMessegesSuccess = (messeges) => {
  return {
    type: FETCH_MESSEGES_SUCCESS,
    messeges
  }
}

const fetchMessegesInit = () => {
  return {
    type: FETCH_MESSEGES_INIT
  }
}

const fetchMessegesFail = (errors) => {
  return {
    type: FETCH_MESSEGES_FAIL,
    errors
  }
}

export const fetchMesseges = () => {
  const url = '/messeges';

  return dispatch => {
    dispatch(fetchMessegesInit());

    axiosInstance.get(url)
      .then(res => res.data )
      .then(messeges => dispatch(fetchMessegesSuccess(messeges)))
      .catch(({response}) => dispatch(fetchMessegesFail(response.data.errors)))
  }
}

export const fetchMessegeById = (messegeId) => {
  return function(dispatch) {
    dispatch(fetchMessegeByIdInit());

    axios.get(`/api/v1/messeges/${messegeId}`)
      .then(res => res.data )
      .then(messege => dispatch(fetchMessegeByIdSuccess(messege))
    );
  }
}

export const createMessege = (messegeData) => {
  return axiosInstance.post('/messeges', messegeData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const resetMessegeErrors = () => {
  return {
    type: RESET_MESSEGE_ERRORS
  }
}

const updateMessegeSuccess = (updatedMessege) => {
  return {
    type: UPDATE_MESSEGE_SUCCESS,
    messege: updatedMessege
  }
}

const updateMessegeFail = (errors) => {
  return {
    type: UPDATE_MESSEGE_FAIL,
    errors
  }
}

export const updateMessege = (id, messegeData) => dispatch => {
  return axiosInstance.patch(`/messeges/${id}`, messegeData)
    .then(res => res.data)
    .then(updatedMessege => {
      dispatch(updateMessegeSuccess(updatedMessege));
    })
    .catch(({response}) => dispatch(updateMessegeFail(response.data.errors)))
}


// USER MESSEGES ACTIONS ---------------------------

export const getUserMesseges = () => {
  return axiosInstance.get('/messeges/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const deleteMessege = (messegeId) => {
  return axiosInstance.delete(`/messeges/${messegeId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}

// AUTH ACTIONS ---------------------------

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({response}) => {
        dispatch(loginFailure(response.data.errors));
      })
  }
}

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  }
}
































