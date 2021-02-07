import axios from 'axios';

import {config} from '../../config';

export const userSignUp = (name, phone_number, password) => (dispatch, getState) => {
  axios.post(`${config.API}/users/signup`, {
    name,
    phone_number,
    password
  }).then((response) => {
    console.log(response);    
  })
}
export const userConfirmSMS = (user_guid, password, code) => (dispatch, getState) => {

}
