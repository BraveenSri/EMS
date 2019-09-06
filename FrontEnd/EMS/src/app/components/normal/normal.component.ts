import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.css']
})
export class NormalComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {}

  public onSignOut(): void {
    this.router.navigate(['home']);
    this.userService.setNormalSignedInStatus(false);
  }

  public onDetail(): void {
    this.router.navigate(['normaluser']);
  }
}
