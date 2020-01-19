
import { ActionEx, GroceryActionTypes } from '../actions/grocery.actions';
export const initialState = [];

export function GroceryReducer(state = initialState, action: ActionEx) {

  switch (action.type) {
    case GroceryActionTypes.Add:
      // const groceries = (action.payload typeof 'array') 
      return [...state, action.payload];

    case GroceryActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];

    case GroceryActionTypes.Update:
      state[action.index] = action.payload;
      return state;

    default:
      return state;
  }

}
