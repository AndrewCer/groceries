import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPage } from './pages/navigation.component';

const routes: Routes = [
  {
    // NOTE: future improvements include a favorites route as well as a user profile route
    path: 'home',
    component: NavigationPage,
    children: [
      {
        path: 'groceries',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../grocery/grocery.module').then(m => m.GroceryModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/groceries',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/groceries',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
