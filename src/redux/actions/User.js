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

export const setUserGUID = (user_guid) => ({
  type: "SET_USER_GUID",
  user_guid
})

export const setToken = (token) => ({
  type: "SET_TOKEN",
  token
})

export const setTokenType = (token_type) => ({
  type: "SET_TOKEN_TYPE",
  token_type
})

export const setCards = (cards) => ({
  type: "SET_CARDS",
  cards
})

export const setDeliveries = (deliveries) => ({
  type: "SET_DELIVERIES",
  deliveries
})

export const setFavoriteVenues = (favoriteVenues) => ({
  type: "SET_FAVORITE_VENUES",
  favoriteVenues
})

export const fetchDelivery = () => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/orders/delivery?&limit=10`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    dispatch(setDeliveries(data.deliveries))
    // console.log('LIST OF DELIVERY:', response)
  })
}

export const fetchListCards = () => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/payments/uzcard`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    dispatch(setCards(data.cards));
  })
}

export const fetchCreateCardWithPin = (card, pin) => (dispatch, getState) => {
  const token = getState().User.token;
  axios({
    method: 'post',
    url: `${config.API}/payments/uzcard/new`, 
    headers: {
      "Authorization":
        `Bearer ${token}`
    },
    data: {
      number: card.number,
      verified: card.verify,
      expire: card.expire,
      recurrent: card.recurrent,
      card_token: card.token
    }
  }).then(({data}) => {
    console.log('UZCARD:',data)
    axios({
      method: 'post',
      url: `${config.API}/payments/uzcard/${data.guid}/pin`, 
      headers: {
        "Authorization":
          `Bearer ${token}`
      },
      data: {
        pin_code: pin
      }
    }).then(response => {
      console.log('PIN:',response)
      dispatch(fetchListCards())
    })
  })
  
}

export const fetchDeleteCard = (card_guid) => (dispatch, getState) => {
  const token = getState().User.token;
  axios({
    url: `${config.API}/payments/uzcard/${card_guid} `,
    method: 'delete',
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(response => {
    dispatch(fetchListCards())
  })
}

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

export const fetchGuestToken = () => (dispatch, getState) => {
  axios.get(`${config.API}/auth/token`).then(({data}) => {
    // console.log('GUEST_TOKEN:', response)
    dispatch(setTokenType("GUEST"))
    dispatch(setToken(data.token))
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

export const fetchUserSignUp = (name, phone_number, password) => (dispatch, getState) => {
  axios.post(`${config.API}/users/signup`, {
    name,
    phone_number,
    password
  }).then(({data}) => {
    console.log('USER_GUID: ', data.user_guid)
    dispatch(setUserGUID(data.user_guid))
  })
}
export const fetchUserConfirmSMS = (user_guid, password, code) => (dispatch, getState) => {
  axios.post(`${config.API}/users/login/sms-code`, {
    user_guid,
    password,
    code
  }).then(({data}) => {
    console.log('confirmSMS:',data)
    dispatch(setToken(data.token))
    dispatch(setTokenType("USER"))
  })  
}

export const addFavouriteVenue = (venue_guid) => (dispatch, getState) => {
  const token = getState().User.token;
  axios({
    url: `${config.API}/users/favorites`, 
    method: "post",
    data: {
      venue_guid
    },
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    alert(data)
  })
}

export const fetchListFavoriteVenues = () => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/users/favorites`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    console.log('LIST:',data)
  })
}