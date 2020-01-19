import { Action } from '@ngrx/store';

export enum GroceryActionTypes {
  Add = '[Grocery Component] Add',
  Remove = '[Grocery Component] Remove',
  Update = '[Grocery Component] Update',
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
  index?: number;
}

export class GroceryAdd implements ActionEx {
  readonly type = GroceryActionTypes.Add;

  constructor(public payload: any) { }
}


export class GroceryUpdate implements ActionEx {
  readonly type = GroceryActionTypes.Update;

  constructor(public payload: any, public index: number) { }
}

export class GroceryRemove implements ActionEx {
  readonly type = GroceryActionTypes.Remove;

  constructor(public payload: any) { }
}
