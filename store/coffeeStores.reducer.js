import ACTION_TYPES from "./coffeeStores.types";

export const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COORDS: {
      return { ...state, coords: action.payload };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
