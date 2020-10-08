import Carro from "../models/Carro.model";

export enum ReducerActionType {
  ADD_CARRO,
  DEL_CARRO,
  UPDATE_CARRO,
}

export interface State {
  carros: Carro[];
}

export const initialState: State = {
  carros: [],
};

export default (
  state: State,
  action: { type: ReducerActionType; payload: any }
): State => {
  switch (action.type) {
    case ReducerActionType.ADD_CARRO: {
      return { ...state, carros: [action.payload, ...state.carros] };
    }
    case ReducerActionType.UPDATE_CARRO: {
      return {
        ...state,
        carros: [
          action.payload,
          ...state.carros.filter((carro) => carro.id !== action.payload.id),
        ],
      };
    }
    case ReducerActionType.DEL_CARRO: {
      return {
        ...state,
        carros: state.carros.filter((carro) => carro.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
