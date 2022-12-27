import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRequest } from '../interfaces';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) public document: Document,
  ) { }

  get isAuthentificated(): boolean {
    return !!this.user$.value;
  }

  login(theUser: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(`${env.domain}/api/users/login`, theUser);
  };

  registration(user: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(`${env.domain}/api/users`, user)
  };

  public getUser(): Observable<UserRequest> {
    const headers = new HttpHeaders({
      Authorization: `Token ${this.user$.value?.token}`
    })
    return this.http.get<UserRequest>(`${env.domain}/api/user`, { headers })
  }

  logout(): void {
    this.user$.next(null);
    this.router.navigate([this.document.location.origin]);
  }
}
