
import { ActionEx, GroceryActionTypes } from '../actions/grocery.actions';
export const initialState = [];

export function GroceryReducer(state = initialState, action: ActionEx) {

  switch (action.type) {
    case GroceryActionTypes.Add:
      let newState;

      const dupeItemIndex = state.findIndex(grocery => grocery.name === action.payload.name);

      if (dupeItemIndex > -1) {
        state[dupeItemIndex].count += 1;
        newState = state;
      } else {
        newState = [...state, action.payload];
      }
      return newState;

    case GroceryActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];

    default:
      return state;
  }

}
