const initialState = {
  selectAddress: false
}

const Modals = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECT_ADDRESS": {
      return {
        ...state,
        selectAddress: action.selectAddress
      }
    }
    default: {
      return state;
    }
  }
}

export default Modals;