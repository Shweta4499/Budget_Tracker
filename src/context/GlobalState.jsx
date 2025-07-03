import { createContext, useReducer, useEffect } from "react";

const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE":
      return {
        ...state,
        transactions: state.transactions.filter(tx => tx.id !== action.payload),
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  const addTransaction = (tx) => dispatch({ type: "ADD", payload: tx });
  const deleteTransaction = (id) => dispatch({ type: "DELETE", payload: id });

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
