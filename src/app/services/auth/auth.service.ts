import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User, Employee, Employer } from './auth';
import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Action,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
interface CustomFirebaseUser extends firebase.User {
  isEmployer: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // firebase object
  firebaseUser: CustomFirebaseUser | null = null;
  // user from db
  user: Observable<Action<DocumentSnapshot<Employer | Employee>>> | null = null;

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    // read local store
  }

  setUserLocalData(user: firebase.User | null, isEmployerLogin: boolean) {
    if (user) {
      const customUser = { ...user, isEmployer: isEmployerLogin };
      this.firebaseUser = customUser;
      localStorage.setItem('user', JSON.stringify(customUser));
      this.user = this.firestore
        .doc<Employer | Employee>(`users/${user.uid}`)
        .snapshotChanges();
    } else {
      localStorage.setItem('user', 'null');
    }
    JSON.parse(localStorage.getItem('user')!);
    this.router.navigate(['']);
    window.location.reload();
  }

  // EMAIL
  async signUp(email: string, password: string, isEmployerLogin: boolean) {
    try {
      console.log('signup');
      const { user } = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.setUserData(user as firebase.User, isEmployerLogin).then(() => {
        this.setUserLocalData(user, isEmployerLogin);
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  async signIn(email: string, password: string, isEmployerLogin: boolean) {
    try {
      const { user } = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      await this.setUserData(user as firebase.User, isEmployerLogin);
      this.setUserLocalData(user, isEmployerLogin);
      return null;
    } catch (error: any) {
      console.error(error);
      return error.code as string;
    }
  }

  // GOOGLE
  async googleAuth(isEmployerLogin: boolean) {
    const user = await this.authLogin(isEmployerLogin);
    if (user) {
      this.setUserLocalData(user, isEmployerLogin);
    } else {
      console.error('NO USER');
    }
  }
  async authLogin(isEmployerLogin: boolean) {
    try {
      const { user } = await this.fireAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.setUserData(user as firebase.User, isEmployerLogin);
      this.router.navigate(['']);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
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

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  async setUserData(user: firebase.User, isEmployerLogin: boolean) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email as string,
      displayName: user.displayName as string,
      photoURL: user.photoURL as string,
      isEmployer: isEmployerLogin,
    };
    console.log('XXDS');
    return await userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  async signOut() {
    await this.fireAuth.signOut();
    this.setUserLocalData(null, false);
  }

  async forgotPassword(passwordResetEmail: string) {
    try {
      await this.fireAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }
}
