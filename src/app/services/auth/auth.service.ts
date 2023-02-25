import { map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  user$: any;
  constructor(
    private afs: AngularFirestore, // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    const a = this.afAuth.currentUser.then((a) => {
      console.log(a);
      return a;
    });
    console.log(a);

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
      }
    });
  }

  async loginEmail(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.setUserData(result.user);
      this.afAuth.authState.subscribe((user_1) => {
        if (user_1) {
          this.router.navigate(['dashboard']);
        }
      });
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  async signUpEmail(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.setUserData(result.user);
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  async forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async googleAuth() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider())
      .then
      // (res: any) => {
      //   this.router.navigate(['dashboard']);
      // }
      ();
  }
  // Auth logic to run auth providers
  async authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
