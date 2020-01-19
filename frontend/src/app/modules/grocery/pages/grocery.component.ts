import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Grocery, ItemToRemove } from '../../../shared/store/models/grocery.model';
import { InputFormValue } from '../../../shared/models/forms/input/input-form-value';
import { GroceryAdd, GroceryRemove, GroceryUpdate } from '../../../shared/store/actions/grocery.actions';
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
    let grocery: Grocery = {
      name: value.input,
      done: false,
      count: 1
    };

    const groceryState = this.getGroceryState(this.store);

    let dupeItemIndex: number;
    console.log(groceryState);

    if (groceryState.length) {
      dupeItemIndex = groceryState.findIndex((stateGrocery) => {
        console.log('stateGrocery: ', stateGrocery);
        console.log('new grocery: ', grocery.name);


        return stateGrocery.name === grocery.name;
      });
    }

    if (dupeItemIndex > -1) {
      grocery = groceryState[dupeItemIndex];
      grocery.count = groceryState[dupeItemIndex].count + 1;
      console.log('doing update...');
      const groceryServiceResponse = await this.groceryService.update(grocery, grocery._id);
      this.store.dispatch(new GroceryUpdate(groceryServiceResponse, dupeItemIndex));
    } else {
      const groceryServiceResponse = await this.groceryService.create(grocery);
      this.store.dispatch(new GroceryAdd(groceryServiceResponse));
    }
  }

  public onEditItem(item: Grocery) {
    // route to edit page, edit page will do a get based off of id that we have from the api
    console.log('edit this: ', item);
    // do routing here
  }

  public async onListItemRemove(itemToRemove: ItemToRemove) {
    await this.groceryService.delete(itemToRemove._id);
    this.store.dispatch(new GroceryRemove(itemToRemove.index));
  }

  private getGroceryState(store: any): Grocery[] {
    let state;
    store.pipe(take(1)).subscribe(outPut => state = outPut);
    return state.groceries;
  }

}

// TODO(acer): setup try catch to handle await errors
