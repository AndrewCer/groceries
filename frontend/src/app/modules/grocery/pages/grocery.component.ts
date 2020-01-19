import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Grocery } from '../../../shared/store/models/grocery.model';
import { InputFormValue } from '../../../shared/models/forms/input/input-form-value';
import { GroceryAdd, GroceryRemove } from '../../../shared/store/actions/grocery.actions';
import { GroceryService } from '../../../core/http/grocery/grocery.service';


@Component({
  styleUrls: ['./grocery.component.scss'],
  templateUrl: 'grocery.component.html'
})
export class GroceryComponent {

  groceries: Observable<Grocery[]>;

  constructor(
    private store: Store<{ groceries: Grocery[] }>,
    private groceryService: GroceryService
  ) {
    this.groceries = store.pipe(select('groceries'));
  }

  public async onInputFormSubmit(value: InputFormValue) {
    const grocery: Grocery = {
      name: value.input,
      done: false,
      count: 1
    };
    this.store.dispatch(new GroceryAdd(await this.groceryService.create(grocery)));
  }

  public onEditItem(item: Grocery) {
    // route to edit page, edit page will do a get based off of id that we have from the api
    console.log('edit this: ', item);
    // do routing here
  }

  public onListItemRemove(groceryIndex: number) {
    this.store.dispatch(new GroceryRemove(groceryIndex));
  }

}
