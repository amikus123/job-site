import { CustomFirebaseUser, User } from './../types';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private firestoreService: FirestoreService) {}

  storeUserAndUpdateUserData(
    user: firebase.User | null,
    isEmployerLogin: boolean
  ) {
    if (user) {
      const customUser = { ...user, isEmployer: isEmployerLogin };
      localStorage.setItem('user', JSON.stringify(customUser));
      this.firestoreService.setUserDataWithUID$(user.uid);
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
      return JSON.parse(localStorageUser) as CustomFirebaseUser;
    }
  }
}
