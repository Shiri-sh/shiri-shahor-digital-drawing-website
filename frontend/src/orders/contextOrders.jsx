import { createContext, useState } from "react";
export const ContextOrders = createContext();
export const ContextOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  return (
    <ContextOrders.Provider value={{ orders, setOrders }}>
      {children}
    </ContextOrders.Provider>
  );
};