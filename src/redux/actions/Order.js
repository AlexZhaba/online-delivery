export const addItemToBasket = (item) => ({type: "ADD_ITEM_TO_BASKET", item})

export const increaseItemCount = (item) => ({type: "INCREASE_ITEM_COUNT", item});

export const decreaseItemCount = (item) => ({type: "DECREASE_ITEM_COUNT", item});

export const clearBasket = () => ({type: "CLEAR_BASKET"})