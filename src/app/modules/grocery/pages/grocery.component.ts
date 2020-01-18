import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Grocery } from '../../../shared/store/models/grocery.model';
import { InputFormValue } from '../../../shared/models/forms/input/input-form-value';
import { GroceryAdd, GroceryRemove } from '../../../shared/store/actions/grocery.actions';

@Component({
  styleUrls: ['./grocery.component.scss'],
  templateUrl: 'grocery.component.html'
})
export class GroceryComponent {

  groceries: Observable<Grocery[]>;

  constructor(private store: Store<{ groceries: Grocery[] }>) {
    this.groceries = store.pipe(select('groceries'));
  }

  public onInputFormSubmit(value: InputFormValue) {
    // if that value already exists, add it to the existing entity
    console.log(this.groceries);
    
    const grocery: Grocery = {
      name: value.input,
      count: 1
    };
    this.store.dispatch(new GroceryAdd(grocery));
  }

  public onListItemRemove(groceryIndex: number) {
    this.store.dispatch(new GroceryRemove(groceryIndex));
  }

}
