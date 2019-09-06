import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { NormalComponent } from './components/normal/normal.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { NormalUserComponent } from './components/normal-user/normal-user.component';
import { AddComponent } from './components/add/add.component';

import { CanActivateAdminGuardService } from './guard-services/can-activate-admin-guard.service';
import { CanActivateNormalGuardService} from './guard-services/can-activate-normal-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CanActivateAdminGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'normal',
    component: NormalComponent,
    canActivate: [CanActivateNormalGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'adminuser',
    component: AdminUserComponent,
    canActivate: [CanActivateAdminGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'normaluser',
    component: NormalUserComponent,
    canActivate: [CanActivateNormalGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [CanActivateAdminGuardService],
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})

export class AppRoutingModule { }