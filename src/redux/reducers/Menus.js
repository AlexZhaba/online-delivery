const initialState = {
  venues: null,
  sortVenues: "price-high-to-low",  //distance, popularity, price-low-to-high, price-high-to-lowб
  collection: null,
  venuesLoad: false,
  activeVenue: null,
  activeMenu: null
}

const Menus = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VENUES": {
      return {
        ...state,
        venues: action.venues
      }
    }
    case "SET_VENUES_LOAD": {
      return {
        ...state,
        venuesLoad: action.venuesLoad
      }
    }
    case "SET_SORT_VENUES": {
      return {
        ...state,
        sortVenues: action.sortVenues
      }
    }
    case "SET_ACTIVE_MENU": {
      return {
        ...state,
        activeMenu: action.activeMenu
      }
    }
    case "SET_ACTIVE_VENUE": {
      return {
        ...state,
        activeVenue: action.activeVenue
      }
    }
    default:
      return state;
  }
}

export default Menus;