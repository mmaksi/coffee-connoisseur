import { createContext, useContext, useReducer } from "react";
import { storeReducer } from "./coffeeStores.reducer";

const initialState = {
  coords: "",
  coffeeStores: [],
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    // Provider React component - Allows consuming components to subscribe to context changes.
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
