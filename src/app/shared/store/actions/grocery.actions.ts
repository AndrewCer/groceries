import { Action } from '@ngrx/store';

export enum GroceryActionTypes {
  Add = '[Grocery Component] Add',
  Remove = '[Grocery Component] Remove'
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class GroceryAdd implements ActionEx {
  readonly type = GroceryActionTypes.Add;

  constructor(public payload: any) { }
}

export class GroceryRemove implements ActionEx {
  readonly type = GroceryActionTypes.Remove;

  constructor(public payload: any) { }
}
// TODO (acer): grocery update
