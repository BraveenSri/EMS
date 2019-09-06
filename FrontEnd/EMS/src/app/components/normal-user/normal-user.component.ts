import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { Department } from 'src/app/models/department'
import { DepartmentService } from 'src/app/shared-services/department.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared-services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null, 
    form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched ) && !(isSubmitted));
  }
}

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.css']
})
export class NormalUserComponent implements OnInit {

  public user: User;
  private selectedUser: User;
  private username: string;
  private users: User[];
  private departments: Department[];

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
    this.username = this.userService.usernameValue;
    this.getUsers();
    this.getDepartments();
    this.display();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      }
    );
  }

  public getDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.departments = departments;
      }
    );
  }

  public display(): void {
    this.userService.getUserByUsername(this.username)
      .subscribe(user => {
        this.selectedUser = user;
      }
    );
  }

  public onSignOut(): void {
    this.router.navigate(['home']);
    this.userService.setNormalSignedInStatus(false);
  }

  public onUpdate(): void {
    document.getElementById("viewBody").style.visibility = "hidden"
    document.getElementById("editBody").style.visibility = "visible";
  }

  public onSave(): void {
    var snackbar1 = document.getElementById("snackbar1");
    var snackbar2 = document.getElementById("snackbar2");
    this.userService.addOrUpdateUser(this.selectedUser)
      .subscribe(data => {
        this.user = data as User;
        snackbar1.className = "show";
        setTimeout(function(){ 
          snackbar1.className = snackbar1.className.replace("show", ""); 
        }, 2000);
        this.router.navigate(['normal']);
      }, () => {
        snackbar2.className = "show";
        setTimeout(function(){ 
          snackbar2.className = snackbar2.className.replace("show", ""); 
        }, 2000);
      }
    );
  }

  public onCancel(): void {
    document.getElementById("viewBody").style.visibility = "visible"
    document.getElementById("editBody").style.visibility = "hidden";
  }
}
