import * as React from "react";
import reducer, { initialState, ReducerActionType, State } from "./reducer";

const StateContext = React.createContext<State>(undefined);
const DispatchContext = React.createContext<
  React.Dispatch<{ type: ReducerActionType; payload: any }>
>(undefined);

const Provider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useStore = () => {
  const state = React.useContext(StateContext);
  const dispath = React.useContext(DispatchContext);
  return { state, dispath };
};

export default { Provider, useStore };
