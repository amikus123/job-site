import firebase from 'firebase/compat/app';
import { Employee, Employer, User } from '../types';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  // user from db
  user$: BehaviorSubject<Employer | Employee | undefined> = new BehaviorSubject<
    Employer | Employee | undefined
  >(undefined);

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
    return await this.setUserDataInDB(userData);
  }

  async setUserDataInDB(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    try {
      await userRef.set(user, {
        merge: true,
      });
      this.setUserData$(user);
    } catch (e) {
      console.error(e);
    }
  }

  async setUserDataIfMissing(user: firebase.User, isEmployerLogin: boolean) {
    const userDBData = await this.getUserData(user.uid);
    // if user is not present in db (first time login) we add him
    if (userDBData === undefined) {
      this.setUserDataDuringLogin(user as firebase.User, isEmployerLogin);
    }
  }
  async setUserDataWithUID$(uid: string) {
    const userCurrentData = await this.getUserData(uid);
    // this.user$.next(userCurrentData);
    this.user$.next(userCurrentData);
  }
  async setUserData$(user: User) {
    this.user$.next(user);
  }
}
