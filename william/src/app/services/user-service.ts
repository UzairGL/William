import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { DataUser } from '../models/dataUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url = 'http://localhost:8080/users';

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + `/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + `/byEmail/${email}`);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  getUserfromLS(): DataUser {
    const user = localStorage.getItem('user');
    if (!user) {
      return { user: undefined, error: 'error' };
    } else {
      const userJson = JSON.parse(user);
      if (!userJson) {
        return { user: undefined, error: 'error' };
      } else {
        return { user: userJson, error: '' };
      }
    }
  }
}
