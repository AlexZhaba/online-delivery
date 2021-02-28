const initialState = {
  basketItems: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [],
  basketVenue: localStorage.getItem('basketVenue') ? JSON.parse(localStorage.getItem('basketVenue')) : null,
  totalPrice: 0,
  basketSum: 0,
  basketLoading: false,
  constraints: null,
}

const Order = (state = initialState, action) => {
  const lang = localStorage.getItem('lang');
  
  switch (action.type) {

    case "SET_TOTAL_PRICE": {
      return {
        ...state,
        totalPrice: action.totalPrice
      }
    }

    case "SET_BASKET_LOADING": {
      return {
        ...state,
        basketLoading: action.basketLoading
      }
    }

    case "SET_CONSTRAINTS": {
      return {
        ...state,
        constraints: action.constraints
      }
    }
    case "SET_BASKET_VALUE": {
      localStorage.setItem('basketVenue', JSON.stringify(action.venue));
      return {
        ...state,
        basketVenue: action.venue
      }
    }
    case "SET_BASKET_SUM": {
      return {
        ...state,
        basketSum: action.sum
      }
    }
    case "ADD_ITEM_TO_BASKET": {
      let isSearch = false;
      let newBasket;
      let bb = state.basketItems.map(item => {
        if (action.item.guid === item.guid 
        && JSON.stringify(item.portion) === JSON.stringify(action.addition.portion || action.item.portions[0])
        && JSON.stringify(item.modifer_groups) === JSON.stringify(action.addition.modiferGroups || [])) {
          isSearch = true;
          return {
            ...item,
            count: item.count + 1
          }
        }
        return item;
      });
      if (isSearch) {
        newBasket = [...bb];
      } else newBasket = [
        ...state.basketItems, 
        {
          max_order_size: action.item.max_order_size,
          min_order_size: action.item.min_order_size,
          guid: action.item.guid,
          name: action.item.name,
          packaging_price: action.addition.portion ? action.addition.portion.packaging_price : action.item.portions[0].packaging_price,
          image_url: action.item.image_urls,
          portion: action.addition.portion || action.item.portions[0],
          modifer_groups: action.addition.modiferGroups,
          count: 1
      }]
      console.log('|||||||||||||||||||||||||||||||');
      console.log(newBasket)
      localStorage.setItem('basket', JSON.stringify(newBasket))
      return {
        ...state,
        basketItems: newBasket
      };
    }
    case "INCREASE_ITEM_COUNT": {
      console.log(state.basketItems)
      let newBasket = state.basketItems.map(item => {
        console.log('increase_shit')
        console.log(action.item);
        console.log(item);
        console.log(JSON.stringify(item.portion) === JSON.stringify(action.item.portion || action.item.portions[0]));
        console.log(JSON.stringify(item.modifer_groups) === JSON.stringify(action.item.modifer_groups || []))
        // console.log(JSON.stringify(item.modifer_group), ' ',JSON.stringify(action.item.portion || []));
        // console.log('action.item:',action.item);
        if (item.guid === action.item.guid 
          && JSON.stringify(item.portion) === JSON.stringify(action.item.portion || action.item.portions[0])
          && JSON.stringify(item.modifer_groups) === JSON.stringify(action.item.modifer_groups || [])) {
          return {
            ...item,
            count: item.count + 1
          }
        } else return item;
      })
      localStorage.setItem('basket', JSON.stringify(newBasket))
      return {
        ...state,
        basketItems: newBasket
      }
    }
    case "DECREASE_ITEM_COUNT": {
      let removeIndex = null;
      let isSearch = false;
      let newBasket = state.basketItems.map((item, index) => {
        if (item.guid === action.item.guid
          && JSON.stringify(item.portion) === JSON.stringify(action.item.portion || action.item.portions[0])
          && JSON.stringify(item.modifer_groups) === JSON.stringify(action.item.modifer_groups || [])) {
          if (item.count - 1 < 1 ) removeIndex = index;
          isSearch = true;
          return {
            ...item,
            count: item.count - 1
          }
        } else return item;
      })
      if (!isSearch) {
        newBasket = state.basketItems.map((item, index) => {
          if (isSearch) return item;
          if (item.guid === action.item.guid) {
            if (item.count - 1 < 1 ) removeIndex = index;
            isSearch = true;
            return {
              ...item,
              count: item.count - 1
            }
          } else return item;
        })
      }

      if (removeIndex !== null) {
        console.log('REMOVE_INDEX:', removeIndex)
        newBasket.splice(removeIndex, 1);
      }
      console.log('newBasket:', newBasket)
      localStorage.setItem('basket', JSON.stringify(newBasket))
      return {
        ...state,
        basketItems: newBasket
      }
    }
    case "CLEAR_BASKET": {
      localStorage.setItem('basket', '');
      localStorage.setItem('basketVenue', '');
      return {
        ...state,
        basketItems: [],
        basketVenue: null
      }
    }
    default: {
      return state;
    }
  }
}

export default Order;