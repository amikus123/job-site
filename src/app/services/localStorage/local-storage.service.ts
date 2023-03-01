import { User } from './../types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storeUser(user: User | null) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    JSON.parse(localStorage.getItem('user')!);
  }

  getUserFromStorage() {
    return localStorage.getItem('user');
  }
  getUserFromStorageAndParse() {
    const localStorageUser = this.getUserFromStorage();
    if (localStorageUser === null) {
      return null;
    } else {
      return JSON.parse(localStorageUser) as User;
    }
  }
}
