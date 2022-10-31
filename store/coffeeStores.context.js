import { createContext, useReducer } from "react";
import { storeReducer, initialState } from "./coffeeStores.reducer";

export const StoreContext = createContext(initialState);
console.log({StoreContext});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  
  return (
    // Provider React component - Allows consuming components to subscribe to context changes.
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
