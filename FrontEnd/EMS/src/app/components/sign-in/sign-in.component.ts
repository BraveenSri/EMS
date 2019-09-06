import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared-services/user.service'
import { CanActivateAdminGuardService } from 'src/app/guard-services/can-activate-admin-guard.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched ) && !(isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private user: User;
  private username: string;
  private password: string;

  public usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  public matcher = new MyErrorStateMatcher();

  constructor(private userService: UserService,
              private canActivateGuardService: CanActivateAdminGuardService,
              private router: Router) {}

  ngOnInit() {}

  public onSignUp(): void {
    this.router.navigate(['signup']);
  }

  public onSignIn(): void {
    var snackbar1 = document.getElementById("snackbar1");
    var snackbar2 = document.getElementById("snackbar2");
    this.userService.getUserByUsername(this.username)
      .subscribe(user => {
        this.user = user;
        if (this.user == null) {
          snackbar1.className = "show";
          setTimeout(function(){ 
            snackbar1.className = snackbar1.className.replace("show", ""); 
          }, 2000);
        }
        else if (this.password == this.user.password) {
          if (this.user.role == "Admin") {
            this.userService.setAdminSignedInStatus(true);
            this.userService.setNormalSignedInStatus(false);
            this.router.navigate(['admin']);
          } else if (this.user.role == "Normal") {
            this.userService.setNormalSignedInStatus(true);
            this.userService.setAdminSignedInStatus(false);
            this.router.navigate(['normal']);
          }
          this.userService.setUsername(this.user.username);
        } else {
          snackbar1.className = "show";
          setTimeout(function(){ 
            snackbar1.className = snackbar1.className.replace("show", ""); 
          }, 2000);
        }
      }, () => {
        snackbar2.className = "show";
        setTimeout(function(){ 
          snackbar2.className = snackbar2.className.replace("show", ""); 
        }, 2000);
      }
    );  
  }

  public onCancel(): void {
    this.router.navigate(['home']);
  }
}