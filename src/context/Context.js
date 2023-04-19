import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFatching: false,
  error: false,
};

export const context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <context.Provider
      value={{
        user: state.user,
        isFatching: state.isFatching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};
