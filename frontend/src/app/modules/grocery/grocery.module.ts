import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { InputComponent } from '../../shared/components/input/input.component';
import { ListComponent } from '../../shared/components/list/list.component';
import { GroceryReducer } from '../../shared/store/reducers/grocery.reducer';

import { EditGroceryComponent } from './components/edit/edit-grocery.component';
import { GroceryComponent } from './pages/grocery.component';

export const ROUTES: Routes = [
  { path: '', component: GroceryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forRoot({
      groceries: GroceryReducer
    })
  ],
  declarations: [
    EditGroceryComponent,
    GroceryComponent,
    InputComponent,
    ListComponent
  ],
  entryComponents: [
    EditGroceryComponent
  ]
})
export class GroceryModule { }
