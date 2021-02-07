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

export const fetchCollections = () => (dispatch, getState) => {
  const token = getState().User.token;
  axios.get(`${config.API}/collections?city_id=e3bb5e76-014c-4dcf-90f6-fc4b5e827558&limit=10`, {
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
  axios.get(`${config.API}/categories?city_id=e3bb5e76-014c-4dcf-90f6-fc4b5e827558&limit=10`, {
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
    response.data.forEach(menu => {
      if (menu.online) {
        dispatch(setActiveMenu(menu))
      }
    })
  })
}

export const fetchVenues = () => (dispatch, getState) => {
  const token = getState().User.token;
  const sortVenues = getState().Menus.sortVenues;
  console.log('token:', token);
  dispatch(setVenuesLoad(true))
  axios.get(`${config.API}/venues?city_id=e3bb5e76-014c-4dcf-90f6-fc4b5e827558&sort=${sortVenues}&limit=10`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(response => {
    dispatch(setVenuesLoad(false))
    dispatch(setVenues(response.data.venues));
  })
}

