import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule } from '@angular/material';

import 'hammerjs';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { NormalComponent } from './components/normal/normal.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { NormalUserComponent } from './components/normal-user/normal-user.component';
import { AddComponent } from './components/add/add.component';

import { DepartmentService } from './shared-services/department.service';
import { UserService } from './shared-services/user.service';
import { CanActivateAdminGuardService } from './guard-services/can-activate-admin-guard.service';
import { CanActivateNormalGuardService } from './guard-services/can-activate-normal-guard.service';

@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    AdminUserComponent,
    NormalUserComponent,
    AddComponent,
    AdminComponent,
    NormalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    DepartmentService,
    CanActivateAdminGuardService,
    CanActivateNormalGuardService
  ],
  bootstrap: [HomeComponent]
})
export class AppModule { }