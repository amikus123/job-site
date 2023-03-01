import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from './../firestore/firestore.service';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User, Employee, Employer } from '../types';
import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user from db
  user$: BehaviorSubject<Employer | Employee | undefined>;
  constructor(
    private fireAuth: AngularFireAuth,
    private firestoreService: FirestoreService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.user$ = this.firestoreService.user$;
    // read local store
    this.fireAuth.authState.subscribe(async (user) => {
      if (user) {
        this.firestoreService.setUserDataWithUID$(user.uid);
      }
    });
  }

  async setUserLocalData(user: firebase.User | null, isEmployerLogin: boolean) {
    this.firestoreService.setUserDataDuringLogin(user, isEmployerLogin);
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

  async signOut() {
    await this.fireAuth.signOut();
    this.setUserLocalData(null, false);
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    const localStorageUser =
      this.localStorageService.getUserFromStorageAndParse();
    console.log(localStorageUser);

    if (localStorageUser === null) {
      return false;
    } else {
      return true;
    }
  }
  get isEmployee(): boolean {
    const localStorageUser =
      this.localStorageService.getUserFromStorageAndParse();
    console.log(localStorageUser, !localStorageUser?.isEmployer, 'isEmployee');

    if (localStorageUser === null) {
      return false;
    } else {
      return !localStorageUser?.isEmployer;
    }
  }
  get isEmployer(): boolean {
    const localStorageUser =
      this.localStorageService.getUserFromStorageAndParse();
    console.log(localStorageUser, !!localStorageUser?.isEmployer, 'isEmployer');
    if (localStorageUser === null) {
      return false;
    } else {
      return !!localStorageUser?.isEmployer;
    }
  }
}
