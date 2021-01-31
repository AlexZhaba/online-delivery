const initialState = {
  basketItems: []
}

const Order = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_BASKET": {
      return {
        ...state,
        basketItems: [...state.basketItems, action.item]
      }
    }
    default: {
      return state;
    }
  }
}

export default Order;