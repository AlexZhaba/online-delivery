const initialState = {
  basketItems: localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : []
}

const Order = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_BASKET": {
      const newBasket = [
        ...state.basketItems, {
        ...action.item,
        count: 1
      }]
      localStorage.setItem('basket', JSON.stringify(newBasket))
      return {
        ...state,
        basketItems: newBasket
      };
    }
    case "INCREASE_ITEM_COUNT": {
      console.log(state.basketItems)
      let newBasket = state.basketItems.map(item => {
        if (item.guid === action.item.guid) {
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
      let newBasket = state.basketItems.map((item, index) => {
        if (item.guid === action.item.guid) {
          if (item.count - 1 < 1 ) removeIndex = index;
          return {
            ...item,
            count: item.count - 1
          }
        } else return item;
      })
      if (removeIndex !== null) {
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
      return {
        ...state,
        basketItems: []
      }
    }
    default: {
      return state;
    }
  }
}

export default Order;