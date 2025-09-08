import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { AuthGuard } from './service/auth/auth.guard';

// Auth


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/auth/account.module').then(m => m.AccountModule)  },
  { path: '', component: LayoutComponent, loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
