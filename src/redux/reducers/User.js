const initialState = {
  token: null,
  tokenType: null,
  user_guid: null,
  lang: localStorage.getItem('lang') || 'ru',
  lon: 0,
  lat: 0,
  profile: null,
  cards: null,
  city: {
    guid: "e3bb5e76-014c-4dcf-90f6-fc4b5e827558"
  }
  // city: "e3bb5e76-014c-4dcf-90f6-fc4b5e827558" // Ташкент
}

const User = (state = initialState, action) => {
  console.log('ACTION:', action)
  switch (action.type) {
    case "SET_TOKEN_TYPE": {
      return {
        ...state,
        tokenType: action.token_type
      }
    }

    case "SET_CARDS": {
      return {
        ...state,
        cards: action.cards
      }
    }

    case "SET_TOKEN": {
      return {
        ...state,
        token: action.token
      }
    }

    case "SET_USER_GUID": {
      return {
        ...state,
        user_guid: action.user_guid
      }
    }

    case "SET_PROFILE": {
      return {
        ...state,
        profile: action.profile
      }
    }

    case "SET_LONGITUDE": {
      return {
        ...state,
        lon: action.lon
      }
    }

    case "SET_LATITUDE": {
      return {
        ...state,
        lat: action.lat
      }
    }

    case "SET_LANG": {
      localStorage.setItem('lang', action.lang)
      return {
        ...state,
        lang: action.lang
      }
    }

    case "SET_CITY": {
      return {
        ...state,
        city: action.city
      }
    }

    default:
      return state;
  }
}


export default User;