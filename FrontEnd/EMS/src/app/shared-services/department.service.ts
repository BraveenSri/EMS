import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = 'http://localhost:8080/ems/departments';

    constructor(private http: HttpClient) { }

    public getDepartments(): Observable<any> {
        return this.http.get(this.baseUrl);
    }
}