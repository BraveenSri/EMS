import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {}

  public onSignOut(): void {
    this.router.navigate(['home']);
    this.userService.setAdminSignedInStatus(false);
  }

  public onDetail(): void {
    this.router.navigate(['adminuser']);
  }
}
