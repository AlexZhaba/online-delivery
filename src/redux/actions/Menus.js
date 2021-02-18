import axios from 'axios';
import {config} from "../../config";

export const setVenues = (venues) => ({
  type: "SET_VENUES",
  venues
});

export const setSortVenues = (sortVenues) => ({
 type: "SET_SORT_VENUES",
 sortVenues
})

export const setVenuesLoad = (venuesLoad) => ({
  type: "SET_VENUES_LOAD",
  venuesLoad
})

export const setActiveVenue = (activeVenue) => ({
  type: "SET_ACTIVE_VENUE",
  activeVenue
})

export const setActiveMenu = (activeMenu) => ({
  type: "SET_ACTIVE_MENU",
  activeMenu
})

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  categories
})

export const setActiveCategory = (categoryId) => ({
  type: "SET_ACTIVE_CATEGORY",
  categoryId
})

export const setCollections = (collections) => ({
  type: "SET_COLLECTIONS",
  collections
})

export const setRestaurantLoading = (isLoading) => ({
  type: "SET_RESTAURANT_LOADING",
  isLoading
})

export const setBanners = (banners) => ({
  type: "SET_BANNERS",
  banners
})

export const fetchBanners = () => (dispatch, getState) => {
  const city_guid = getState().User.city.guid;
  axios.get(`${config.API}/banners/group/first?city_id=${city_guid}`).then(({data}) => {
    // console.log('_______dataBanners:', response)
    // if (data.enabled) {
      dispatch(setBanners(data.items));
    // }
  })
}

export const fetchCollections = () => (dispatch, getState) => {
  const token = getState().User.token;
  const cityGUID = getState().User.city.guid;
  axios.get(`${config.API}/collections?city_id=${cityGUID}&limit=10`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    dispatch(setCollections(data.collections))
    //console.log('collections: ', data)
  })
}

export const fetchVenuesByCategory = (categoryId) => (dispatch, getState) => {
  const token = getState().User.token;
  dispatch(setVenuesLoad(true));
  dispatch(setActiveCategory(categoryId))
  axios.get(`${config.API}/categories/${categoryId}/venues?limit=10`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    dispatch(setVenues(data.venues))
    dispatch(setVenuesLoad(false));
  })
}

export const fetchCategories = () => (dispatch, getState) => {
  const token = getState().User.token;
  const cityGUID = getState().User.city.guid;
  axios.get(`${config.API}/categories?city_id=${cityGUID}&limit=10`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => {
    dispatch(setCategories(data.categories))
  })  
}

export const fetchVenueById = (id) => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/venues/${id}`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(response => {
    console.log('ACTIVE_VENUE=',response.data)
    dispatch(setActiveVenue(response.data));
    const restaurantLoading = getState().Menus.restaurantLoading;
    if (restaurantLoading) {
      const activeMenu = getState().Menus.activeMenu;
      console.log('activeMenu: ', activeMenu)
      if (activeMenu !== null) dispatch(setRestaurantLoading(id));
    }
  })
}

export const fetchMenuById = (id) => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/venues/${id}/menus`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(response => {
    // console.log(response)
    let added = false;
    response.data.forEach(menu => {
      if (menu.online) {
        dispatch(setActiveMenu(menu))
        added = true
      }
    })
    if (!added) dispatch(setActiveMenu(undefined))
    const restaurantLoading = getState().Menus.restaurantLoading;
    if (restaurantLoading) {
      const activeVenue = getState().Menus.activeVenue;
      console.log('activeVenue: ', activeVenue)
      if (activeVenue !== null) dispatch(setRestaurantLoading(id));
    }
  })
}

export const fetchVenues = () => (dispatch, getState) => {
  const token = getState().User.token;
  const sortVenues = getState().Menus.sortVenues;
  const cityGUID = getState().User.city.guid;
  console.log('token:', token);
  dispatch(setVenuesLoad(true))
  axios.get(`${config.API}/venues?city_id=${cityGUID}&sort=${sortVenues}&limit=10`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(response => {
    dispatch(setVenuesLoad(false))
    dispatch(setVenues(response.data.venues));
  })
}

