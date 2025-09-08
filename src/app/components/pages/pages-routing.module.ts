import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VarietyComponent } from './variety/variable.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/detail-user/user-detail.component';
import { UserConfigComponent } from './user/config-user/user-config.component';
import { StarterComponent } from './starter/starter.component';
import { DetailVarietyComponent } from './variety/detail-variety/detail-variety.component';



const routes: Routes = [
  { path: "", component: StarterComponent },
  { path: "user", component: UserComponent },
  { path: "user-detail/:id", component: UserDetailComponent },
  { path: "user-config/:id", component: UserConfigComponent },
  { path: "variety", component: VarietyComponent },
  { path: "variety-detail/:id", component: DetailVarietyComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
