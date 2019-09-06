import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  public onSignUp(): void {
    this.router.navigate(['signup']);
  }

  public onSignIn(): void {
    this.router.navigate(['signin']);
  }
}