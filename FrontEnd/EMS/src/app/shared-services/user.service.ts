import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/ems/users';

  private adminSignedInStatus: boolean = false;
  private normalSignedInStatus: boolean = false;
  private username: string = "";

  constructor(private http: HttpClient) { }

  public setAdminSignedInStatus(value: boolean): void {
    this.adminSignedInStatus = value;
  }

  public setNormalSignedInStatus(value: boolean): void {
    this.normalSignedInStatus = value;
  }

  public setUsername(value: string): void {
    this.username = value;
  }

  public get isAdminSignedIn(): boolean {
    return this.adminSignedInStatus;
  }
  
  public get isNormalSignedIn(): boolean {
    return this.normalSignedInStatus;
  }

  public get usernameValue(): string {
    return this.username;
  }

  public getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  public getUserByUsername(username: string): Observable<any> {
    return this.http.get(this.baseUrl+"/"+username);
  }
  
  public addOrUpdateUser(user: Object): Observable<Object> {
    return this.http.post(this.baseUrl, user);
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.delete(this.baseUrl+"/"+username, { responseType: 'text' });
  }
}