import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from 'src/app/shared-services/user.service'

@Injectable({
  providedIn: 'root'
})
export class CanActivateAdminGuardService {

  constructor(private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAdminSignedIn;
  }
}
