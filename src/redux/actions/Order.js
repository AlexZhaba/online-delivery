import axios from "axios";
import {config} from '../../config';

export const addItemToBasket = (item, addition) => ({type: "ADD_ITEM_TO_BASKET", item, addition})

export const increaseItemCount = (item) => ({type: "INCREASE_ITEM_COUNT", item});

export const decreaseItemCount = (item) => ({type: "DECREASE_ITEM_COUNT", item});

export const setBasketVenue = (venue) => ({type: "SET_BASKET_VALUE", venue});

export const clearBasket = () => ({type: "CLEAR_BASKET"})

export const setBasketSum = (sum) => ({type: "SET_BASKET_SUM", sum})

export const setOrderConstraints = (constraints) => ({type: "SET_CONSTRAINTS", constraints})

export const setBasketLoading = (basketLoading) => ({type: "SET_BASKET_LOADING", basketLoading});

export const setTotalPrice = (totalPrice) => ({type: "SET_TOTAL_PRICE", totalPrice})

export const fetchMakeOrder = (cart) => (dispatch, getState) => {
  const token = getState().User.token;
  axios({
    method: "post",
    url: `${config.API}/orders/new`,
    data: cart,
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(response => {
    console.log('MAKE_ORDER: ', response)
  })
}


export const fetchOrderConstraints = (type = "delivery") => (dispatch, getState) => {
  const lat = getState().User.lat;
  const lon = getState().User.lon;
  const venue_guid = getState().Order.basketVenue.guid;
  const order_price = getState().Order.basketSum;
  const token = getState().User.token;
  const date = new Date();
  // console.log('%c $$$$$$$$$$$$$$$$', 'color: red')
  // console.log(lat, ' ', lon, ' ', venue_guid, ' ', order_price);
  dispatch(setBasketLoading(true));
  axios.get(`${config.API}/orders/constraints?v=${venue_guid}&ll=${lon},${lat}&p=${order_price}&t=${date.toISOString()}&limit=1`, {
    headers: {
      "Authorization":
        `Bearer ${token}`
    }
  }).then(({data}) => { 
    dispatch(setOrderConstraints(data[type]))
    dispatch(setBasketLoading(false));
    // console.log('%c',data, 'font-size: 20px; color: blue; font-weight: bold')
  })
}