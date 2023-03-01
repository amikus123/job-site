import firebase from 'firebase/compat/app';
import { User } from '../types';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  async getUserData(uid: string) {
    const doc = await this.firestore.doc<User>(`users/${uid}`).ref.get();

    return doc.data();
  }

  async setUserDataDuringLogin(
    user: firebase.User,
    isEmployerLogin: boolean,
    username?: string
  ) {
    const userData: User = {
      uid: user.uid,
      email: user.email as string,
      username: username ? username : (user.displayName as string),
      photoURL: user.photoURL as string,
      isEmployer: isEmployerLogin,
    };
    return await this.setUserData(userData);
  }

  async setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    return await userRef.set(user, {
      merge: true,
    });
  }

  async setUserDataIfMissing(user: firebase.User, isEmployerLogin: boolean) {
    const userDBData = await this.getUserData(user.uid);
    // if user is not present in db (first time login) we add him
    if (userDBData === undefined) {
      this.setUserDataDuringLogin(user as firebase.User, isEmployerLogin);
    }
  }
}
