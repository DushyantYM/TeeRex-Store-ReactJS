import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./Reducer"

const Cart = createContext({});


const Context = ({ children }) => {
//   const products = ;

  const [state, dispatch] = useReducer(cartReducer, {
    // products: products,
    cart: [],
  });

  console.log("cart",state.cart)


  return (
    <Cart.Provider value={{ state, dispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;