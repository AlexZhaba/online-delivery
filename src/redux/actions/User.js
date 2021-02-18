import axios from 'axios';

import {config} from '../../config';

export const setLang = (lang) => ({
  type: "SET_LANG",
  lang
})

export const setCity = (city) => ({
  type: "SET_CITY",
  city
})

export const setLongitude = (lon) => ({
  type: "SET_LONGITUDE",
  lon
})

export const setLatitude = (lat) => ({
  type: "SET_LATITUDE",
  lat
})

export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  profile
})


export const fetchProfile = () => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/users/me`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    dispatch(setProfile(data))
    console.log('USER:',data)
  })
}

export const fetchUpdateProfile = (profile) => (dispatch, getState) => {
  const token = getState().User.token;
  axios({
    url: `${config.API}/users/me`,
    method: 'put',
    headers: {
      "Authorization":
        `Bearer ${token}`
    },
    data: profile
  }).then(({data}) => {
    console.log('data:',data)
  })
}

export const getCity = (lon, lat) => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/cities?ll=${lon},${lat}&limit=1`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    if (data.cities.length > 0) {
      dispatch(setCity(data.cities[0]));
    } else {
      // Интересный вопрос, что делать
    }
  })
}

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
