import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/shared-services/department.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared-services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched ) && !(isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private user: User;
  private selectedUser: User;
  private retypePassword: string;
  public departments: Department[];

  public userIdFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z0-9]+"),
    Validators.required
  ]);

  public firstNameFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z]+"),
    Validators.required
  ]);

  public lastNameFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z]+"),
    Validators.required
  ]);

  public usernameFormControl = new FormControl('', [
    Validators.pattern("([A-Za-z0-9_])+"),
    Validators.minLength(8),
    Validators.required
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z0-9_@#]+"),
    Validators.minLength(8),
    Validators.required
  ]);

  public retypePasswordFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z0-9_@#]+"),
    Validators.minLength(8),
    Validators.required
  ]);

  public dobFormControl = new FormControl('', [
    Validators.required
  ]);

  public genderFormControl = new FormControl('', [
    Validators.required
  ]);

  public departmentFormControl = new FormControl('', [
    Validators.required
  ]);

  public roleFormControl = new FormControl('', [
    Validators.required
  ]);

  public addressFormControl = new FormControl('', [
    Validators.required
  ]);

  public contactNoFormControl = new FormControl('', [
    Validators.pattern("[0-9]+"),
    Validators.minLength(9),
    Validators.maxLength(9),
    Validators.required
  ]);

  public matcher = new MyErrorStateMatcher();

  constructor(private departmentService: DepartmentService,
              private userService: UserService, 
              private router: Router) {}

  ngOnInit() {
    this.user = new User();
    this.getDepartments();
  }

  public getDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      }
    );
  }

  public onSignIn(): void {
    this.router.navigate(['signin']);
  }

  public onSignUp(): void {
    var snackbar1 = document.getElementById("snackbar1");
    var snackbar2 = document.getElementById("snackbar2");
    var snackbar3 = document.getElementById("snackbar3");
    var snackbar4 = document.getElementById("snackbar4");
    this.userService.getUserByUsername(this.user.username)
      .subscribe(selectedUser => {
        this.selectedUser = selectedUser;
        if (this.selectedUser == null) {
          if (this.user.password == this.retypePassword) {
            this.userService.addOrUpdateUser(this.user)
              .subscribe(() => {
                snackbar1.className = "show";
                setTimeout(function() {
                  snackbar1.className = snackbar1.className.replace("show","");
                }, 2000);
                setTimeout(function() {
                  location.reload(true);
                }, 1000);
              }, () => {
                snackbar2.className = "show";
                setTimeout(function() {
                  snackbar2.className = snackbar2.className.replace("show","");
                }, 2000);
              }
            );
            this.user = new User();
          } else {
            snackbar3.className = "show";
            setTimeout(function(){ 
              snackbar3.className = snackbar3.className.replace("show", "");
            }, 2000);
          }
        } else {
          snackbar4.className = "show";
          setTimeout(function(){ 
            snackbar4.className = snackbar4.className.replace("show", ""); 
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