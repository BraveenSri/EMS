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
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  public user: User;
  public filteredUsers: User[];
  private selectedUser: User;
  private departments: Department[];
  private users: User[];
  private firstNameFilter: string;
  private lastNameFilter: string;
  private userIdFilter: string;
  private departmentFilter: string;

  public firstNameFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z]+"),
    Validators.required
  ]);

  public lastNameFormControl = new FormControl('', [
    Validators.pattern("[A-Za-z]+"),
    Validators.required
  ]);

  public dobFormControl = new FormControl('', [
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
    this.getDepartments();
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.filteredUsers = this.users;
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

  public onAdd(): void {
    this.router.navigate(['add']);
  }

  public onSignOut(): void {
    this.router.navigate(['home']);
    this.userService.setAdminSignedInStatus(false);
  }

  public onUpdate(user: User): void {
    this.selectedUser = user;
    document.getElementById("viewBody").style.visibility = "hidden";
    document.getElementById("editBody").style.visibility = "visible";
  }

  public onDelete(username: string): void {
    var snackbar1 = document.getElementById("snackbar1");
    var snackbar2 = document.getElementById("snackbar2");
    this.userService.deleteUser(username)
      .subscribe(() => {
        this.router.navigate(['admin']);
      }, () => {
        snackbar2.className = "show";
        setTimeout(function(){ 
          snackbar2.className = snackbar2.className.replace("show", ""); 
        }, 2000);
      }
    );
  }

  public onSave(): void {
    var snackbar3 = document.getElementById("snackbar3");
    var snackbar4 = document.getElementById("snackbar4");
    this.userService.addOrUpdateUser(this.selectedUser)
      .subscribe(data => {
        this.user = data as User;
        snackbar3.className = "show";
        setTimeout(function(){ 
          snackbar3.className = snackbar3.className.replace("show", ""); 
        }, 2000);
        document.getElementById("viewBody").style.visibility = "visible";
        document.getElementById("editBody").style.visibility = "hidden";
      }, () => {
        snackbar4.className = "show";
        setTimeout(function(){ 
          snackbar4.className = snackbar4.className.replace("show", ""); 
        }, 2000);
      }
    );
  }

  public onCancel(): void {
    document.getElementById("viewBody").style.visibility = "visible";
    document.getElementById("editBody").style.visibility = "hidden";
  }

  public get firstNameList(): string {
    return this.firstNameFilter;
  }

  public get lastNameList(): string {
    return this.lastNameFilter;
  }

  public get userIdList(): string {
    return this.userIdFilter;
  }

  public get departmentList(): string {
    return this.departmentFilter;
  }

  public set firstNameList(value: string) {
    this.firstNameFilter = value;
    this.filteredUsers = this.firstNameList ? this.performFirstNameFilter(this.firstNameList): this.users;
  }

  public set lastNameList(value: string) {
    this.lastNameFilter = value;
    this.filteredUsers = this.lastNameList ? this.performLastNameFilter(this.lastNameList): this.users;
  }

  public set userIdList(value: string) {
    this.userIdFilter = value;
    this.filteredUsers = this.userIdList ? this.performUserIdFilter(this.userIdList): this.users;
  }

  public set departmentList(value: string) {
    this.departmentFilter = value;
    this.filteredUsers = this.departmentList ? this.performDepartmentFilter(this.departmentList): this.users;
  }

  public performFirstNameFilter(filterBy: string): User[] {
    return this.filteredUsers.filter((user: User) =>
        user.firstName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  }

  public performLastNameFilter(filterBy: string): User[] {
    return this.filteredUsers.filter((user: User) =>
        user.lastName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  }

  public performUserIdFilter(filterBy: string): User[] {
    return this.filteredUsers.filter((user: User) =>
        user.userId.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  }

  public performDepartmentFilter(filterBy: string): User[] {
    return this.filteredUsers.filter((user: User) =>
        user.department.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
  }
}