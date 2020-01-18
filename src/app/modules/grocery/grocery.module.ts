import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { GroceryComponent } from './pages/grocery.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ListComponent } from '../../shared/components/list/list.component';

export const ROUTES: Routes = [
    { path: '', component: GroceryComponent }
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    GroceryComponent,
    InputComponent,
    ListComponent
  ]
})
export class GroceryModule {}
