import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPage } from './pages/navigation.component';

const routes: Routes = [
  {
    // TODO (acer): change this route...maybe
    // TODO (acer): add a favorites tab that users can use to quickly add items to the list
    path: 'home',
    component: NavigationPage,
    children: [
      {
        path: 'groceries',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../grocery/grocery.module').then(m => m.GroceryModule),
          }
          // {
          //   path: ':id',
          //   component: Grocery
          // }
          // TODO (acer): setup eddit path
          // {
          //   path: ':id',
          //   loadChildren: () =>
          //     import('../grocery/grocery.module').then(m => m.GroceryModule)
          // }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../user/user.module').then(m => m.UserModule)
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
