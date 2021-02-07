const initialState = {
  venues: null,
  sortVenues: "price-high-to-low",  //distance, popularity, price-low-to-high, price-high-to-low
  venuesLoad: false, 
  activeVenue: null,
  activeMenu: null,
  categories: null, 
  activeCategory: null,
  collections: null,
  restaurantLoading: null
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
    case "SET_CATEGORIES": {
      return {
        ...state,
        categories: action.categories
      }
    }
    case "SET_ACTIVE_CATEGORY": {
      return {
        ...state,
        activeCategory: action.categoryId
      }
    }
    case "SET_COLLECTIONS": {
      return {
        ...state,
        collections: action.collections
      }
    }

    case "SET_RESTAURANT_LOADING": {
      return {
        ...state,
        restaurantLoading: action.isLoading
      }
    }

    default:
      return state;
  }
}

export default Menus;