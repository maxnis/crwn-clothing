import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

// actual value to access
export const ProductsContext = createContext({
  products: [],
  //setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products] = useState(PRODUCTS);
  const value = { products };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     console.log(user);
  //     if (user) {
  //       createUserDocFromAuth(user);
  //     }
  //     setCurrentUser(user);
  //   })
  //   return unsubscribe;
  // }, []);

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}
