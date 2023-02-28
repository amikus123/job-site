import { BehaviorSubject, EMPTY, map, Observable, Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User, Employee, Employer } from './auth';
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
  // firebase user object
  firebaseUser: CustomFirebaseUser | null = null;
  // user from db
  user$: BehaviorSubject<Employer | Employee | undefined> = new BehaviorSubject<
    Employer | Employee | undefined
  >(undefined);

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
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
      this.firebaseUser = customUser;
      localStorage.setItem('user', JSON.stringify(customUser));
      this.setUserData$(user.uid);
    } else {
      localStorage.setItem('user', 'null');
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
      this.setUserDataInDB(
        user as firebase.User,
        isEmployerLogin,
        username
      ).then(() => {
        this.setUserLocalData(user, isEmployerLogin);
      });
      return null;
    } catch (error: any) {
      console.error(error);
      return error.code as string;
    }
  }

  async getUserData(uid: string) {
    const doc = await this.firestore.doc<User>(`users/${uid}`).ref.get();
    return doc.data();
  }
  async setUserData$(uid: string) {
    const userCurrentData = await this.getUserData(uid);
    this.user$.next(userCurrentData);
  }

  async signIn(email: string, password: string) {
    try {
      const { user } = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const userData = (await this.getUserData(user?.uid as string)) as User;
      await this.setUserDataInDB(user as firebase.User, userData?.isEmployer);
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
      const userDBData = await this.getUserData(user.uid);
      // if user is not present in db (first time login) we add him
      if (userDBData === undefined) {
        this.setUserDataInDB(user as firebase.User, isEmployerLogin);
      }

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
      this.setUserDataInDB(user as firebase.User, isEmployerLogin);
      this.router.navigate(['']);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async setUserDataInDB(
    user: firebase.User,
    isEmployerLogin: boolean,
    username?: string
  ) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email as string,
      username: username ? username : (user.displayName as string),
      photoURL: user.photoURL as string,
      isEmployer: isEmployerLogin,
    };
    return await userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  async signOut() {
    await this.fireAuth.signOut();
    this.setUserLocalData(null, false);
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    const user: CustomFirebaseUser | null =
      JSON.parse(localStorage.getItem('user') || '') || this.firebaseUser;
    return !!user;
  }
  get isEmployee(): boolean {
    const user: CustomFirebaseUser | null =
      JSON.parse(localStorage.getItem('user') || '') || this.firebaseUser;
    return !!user && !user?.isEmployer;
  }
  get isEmployer(): boolean {
    const user: CustomFirebaseUser | null =
      JSON.parse(localStorage.getItem('user') || '') || this.firebaseUser;
    return user?.isEmployer || false;
  }
}
