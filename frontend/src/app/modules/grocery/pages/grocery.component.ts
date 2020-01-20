import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { EditGroceryComponent } from '../components/edit/edit-grocery.component';

import { Grocery, ItemWithIndex } from '../../../shared/store/models/grocery.model';
import { InputFormValue } from '../../../shared/models/forms/input/input-form-value';
import { GroceryAdd, GroceryRemove, GroceryUpdate } from '../../../shared/store/actions/grocery.actions';
import { GroceryService } from '../../../core/http/grocery/grocery.service';


@Component({
  styleUrls: ['./grocery.component.scss'],
  templateUrl: 'grocery.component.html'
})
export class GroceryComponent implements OnInit {

  groceries: Observable<Grocery[]>;

  constructor(
    public modalController: ModalController,
    private groceryService: GroceryService,
    private store: Store<{ groceries: Grocery[] }>,
  ) {
    this.groceries = store.pipe(select('groceries'));
  }

  public async ngOnInit() {
    const groceryServiceResponse = await this.groceryService.findAll();
    groceryServiceResponse.forEach(grovery => this.store.dispatch(new GroceryAdd(grovery)));
  }

  public async onInputFormSubmit(value: InputFormValue) {
    let grocery: Grocery = {
      name: value.input,
      done: false,
      count: 1
    };

    const groceryState = this.getGroceryState(this.store);

    let dupeItemIndex: number;

    if (groceryState.length) {
      dupeItemIndex = this.getDupeItemIndex(groceryState, 'name', grocery.name);
    }

    if (dupeItemIndex > -1) {
      grocery = groceryState[dupeItemIndex];
      grocery.count = groceryState[dupeItemIndex].count + 1;

      const groceryServiceResponse = await this.groceryService.update(grocery, grocery._id);
      this.store.dispatch(new GroceryUpdate(groceryServiceResponse, dupeItemIndex));
    } else {
      const groceryServiceResponse = await this.groceryService.create(grocery);
      this.store.dispatch(new GroceryAdd(groceryServiceResponse));
    }
  }

  public async onEditItem(item: Grocery) {
    const modal = await this.modalController.create({
      component: EditGroceryComponent,
      componentProps: { id: item._id }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const groceryState = this.getGroceryState(this.store);
      const dupeItemIndex = this.getDupeItemIndex(groceryState, '_id', data._id);

      const groceryServiceResponse = await this.groceryService.update(data, data._id);
      this.store.dispatch(new GroceryUpdate(groceryServiceResponse, dupeItemIndex));
    }
  }

  public async onItemChecked(itemToUpdate: ItemWithIndex) {
    const updateIndex = itemToUpdate.index;
    delete itemToUpdate.index;
    itemToUpdate.done = !itemToUpdate.done;

    const groceryServiceResponse = await this.groceryService.update(itemToUpdate, itemToUpdate._id);
    this.store.dispatch(new GroceryUpdate(groceryServiceResponse, updateIndex));
  }

  public async onListItemRemove(itemToRemove: ItemWithIndex) {
    await this.groceryService.delete(itemToRemove._id);
    this.store.dispatch(new GroceryRemove(itemToRemove.index));
  }

  private getDupeItemIndex(groceries: Grocery[], searchProperty: string, searchField: string | number): number {
    return groceries.findIndex((grocery) => {
      return grocery[searchProperty] === searchField;
    });
  }

  private getGroceryState(store: any): Grocery[] {
    let state;
    store.pipe(take(1)).subscribe(outPut => state = outPut);
    return state.groceries;
  }

}

// TODO(acer): setup try/catch to handle await errors
