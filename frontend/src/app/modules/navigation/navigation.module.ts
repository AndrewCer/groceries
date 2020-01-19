import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavRoutingModule } from './navigation-routing.module';

import { NavigationPage } from './pages/navigation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavRoutingModule
  ],
  declarations: [NavigationPage]
})
export class NavigationModule {}
