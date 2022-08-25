import { Injectable } from '@angular/core';
import { User } from 'src/app/_models';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

const currentUserStorageKey = 'currentUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private localStorageService: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(this.localStorageService.getItem(currentUserStorageKey));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data: any) {
    const user: User = {
      userName: 'demo',
      firstName: 'Jhon',
      lastName: 'Doe'
    }

    this.localStorageService.setItem(currentUserStorageKey, user);
    this.currentUserSubject.next(user);
  }

  logout() {
    this.clearAuthData();
  }

  isAuthenticated(): boolean {
    const user = this.currentUserSubject.value;

    return user !== null;
  }

  private clearAuthData() {
    this.localStorageService.removeItem(currentUserStorageKey);

    this.currentUserSubject.next(<User>{});
  }
}
