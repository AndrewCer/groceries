import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesComponent } from './pages/favorites.component';

export const ROUTES: Routes = [
    { path: '', component: FavoritesComponent }
  ];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [FavoritesComponent]
})
export class FavoritesModule {}
