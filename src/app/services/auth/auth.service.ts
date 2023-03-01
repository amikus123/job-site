import { FirestoreService } from './../firestore/firestore.service';
import { BehaviorSubject, EMPTY, map, Observable, Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User, Employee, Employer } from '../types';
import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface CustomFirebaseUser extends firebase.User {
  isEmployer: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user from db
  user$: BehaviorSubject<Employer | Employee | undefined> = new BehaviorSubject<
    Employer | Employee | undefined
  >(undefined);

  constructor(
    private fireAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    // read local store
    this.fireAuth.authState.subscribe(async (user) => {
      if (user) {
        this.setUserData$(user.uid);
      }
    });
  }

  async setUserLocalData(user: firebase.User | null, isEmployerLogin: boolean) {
    if (user) {
      const customUser = { ...user, isEmployer: isEmployerLogin };
      localStorage.setItem('user', JSON.stringify(customUser));
      this.setUserData$(user.uid);
    } else {
      localStorage.removeItem('user');
    }
    JSON.parse(localStorage.getItem('user')!);
    this.router.navigate(['']);
    window.location.reload();
  }

  async signUp(
    email: string,
    password: string,
    username: string,
    isEmployerLogin: boolean
  ) {
    try {
      const { user } = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.firestoreService
        .setUserDataDuringLogin(
          user as firebase.User,
          isEmployerLogin,
          username
        )
        .then(() => {
          this.setUserLocalData(user, isEmployerLogin);
        });
      return null;
    } catch (error: any) {
      console.error(error);
      return error.code as string;
    }
  }

  async setUserData$(uid: string) {
    const userCurrentData = await this.firestoreService.getUserData(uid);
    this.user$.next(userCurrentData);
  }

  async signIn(email: string, password: string) {
    try {
      const { user } = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const userData = (await this.firestoreService.getUserData(
        user?.uid as string
      )) as User;
      this.setUserLocalData(user, userData?.isEmployer);
      return null;
    } catch (error: any) {
      console.error(error);
      return error.code as string;
    }
  }

  async googleAuth(isEmployerLogin: boolean) {
    const user = await this.googleAuthLogin(isEmployerLogin);
    if (user) {
      await this.firestoreService.setUserDataIfMissing(user, isEmployerLogin);
      this.setUserLocalData(user, isEmployerLogin);
    } else {
      console.error('NO USER');
    }
  }
  async googleAuthLogin(isEmployerLogin: boolean) {
    try {
      const { user } = await this.fireAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.firestoreService.setUserDataDuringLogin(
        user as firebase.User,
        isEmployerLogin
      );
      this.router.navigate(['']);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Sign out
  async signOut() {
    await this.fireAuth.signOut();
    this.setUserLocalData(null, false);
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser === null) {
      return false;
    } else {
      const user: CustomFirebaseUser | null = JSON.parse(localStorageUser);
      return true;
    }
  }
  get isEmployee(): boolean {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser === null) {
      return false;
    } else {
      const user: CustomFirebaseUser | null = JSON.parse(localStorageUser);

      return !user?.isEmployer;
    }
  }
  get isEmployer(): boolean {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser === null) {
      return false;
    } else {
      const user: CustomFirebaseUser | null = JSON.parse(localStorageUser);
      return !!user?.isEmployer;
    }
  }
}
