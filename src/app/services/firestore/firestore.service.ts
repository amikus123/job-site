import { JobOffer, JobOfferWithId } from './../../utils/jobOffer';
import { LocalStorageService } from './../localStorage/local-storage.service';
import firebase from 'firebase/compat/app';
import { Employee, Employer, User } from '../types';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, from, merge, Observable, take, zip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  // user from db
  user$: BehaviorSubject<Employer | Employee | undefined | null> =
    new BehaviorSubject<Employer | Employee | undefined | null>(undefined);

  constructor(
    private firestore: AngularFirestore,
    private localStorageService: LocalStorageService
  ) {
    const user = this.localStorageService.getUserFromStorageAndParse();
    if (user !== null) {
      this.user$.next(user);
    } else {
      this.user$.next(null);
    }
  }

  async getUserData(uid: string) {
    const doc = await this.firestore.doc<User>(`users/${uid}`).ref.get();
    return doc.data();
  }

  async setUserDataDuringLogin(
    user: firebase.User | null,
    isEmployerLogin: boolean,
    username?: string
  ) {
    if (user) {
      const userData: User = {
        uid: user.uid,
        email: user.email as string,
        username: username ? username : (user.displayName as string),
        photoURL: user.photoURL as string,
        isEmployer: isEmployerLogin,
      };
      return await this.setUserDataInDB(userData);
    }
  }

  async setUserDataInDB(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    try {
      await userRef.set(user, {
        merge: true,
      });
      this.localStorageService.storeUser(user);
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
    this.user$.next(userCurrentData);
  }
  setUserData$(user: User) {
    this.user$.next(user);
  }

  async createJobOffer(jobOffer: JobOffer) {
    return this.firestore
      .collection('jobOffers')
      .add({ ...jobOffer, applications: [] });
  }
  getUserJobOffers(uid: string): Observable<JobOffer[]> {
    return this.firestore
      .collection<JobOffer>('jobOffers', (ref) =>
        ref.where('authorUid', '==', uid)
      )
      .valueChanges({ idField: 'id' });
  }

  deleteJobOfffer(jobId: string) {
    return this.firestore.collection('jobOffers').doc(jobId).delete();
  }

  getJobOffer(jobId: string) {
    return this.firestore
      .doc<JobOffer>(`jobOffers/${jobId}`)
      .valueChanges() as Observable<JobOffer>;
  }
  modifyJobOffer(jobId: string, data: JobOffer) {
    return this.firestore.doc<JobOffer>(`jobOffers/${jobId}`).update(data);
  }
  getAllJobs(): Observable<[JobOfferWithId[], User[]]> {
    const jobOffers: Observable<JobOfferWithId[]> = this.firestore
      .collection<JobOffer>('jobOffers')
      .valueChanges({ idField: 'id' });

    const users = this.firestore.collection<User>('users').valueChanges();
    const joinedData = zip(jobOffers, users);
    return joinedData;
  }

  async addAplicationToJob(userId: string, jobId: string) {
    const job = this.firestore.doc<JobOffer>(`jobOffers/${jobId}`);
    const currecntApplications =
      (await job.ref.get()).data()?.applications || [];
    if (currecntApplications.includes(userId)) {
      return 'Already applied';
    } else {
      try {
        return job.update({ applications: [...currecntApplications, userId] });
      } catch (e) {
        return 'Error';
      }
    }
  }

  getUserName(userId: string | undefined) {
    const user = this.firestore.doc<User>(`users/${userId}`).valueChanges();
    return user;
  }

  getJobsUserApplied(userId: string) {
    const appliedJobs = this.firestore
      .collection<JobOffer>('jobOffers', (ref) =>
        ref.where('applications', 'array-contains', userId)
      )
      .valueChanges({ idField: 'id' });
    const users = this.firestore.collection<User>('users').valueChanges();
    const joinedData = zip(appliedJobs, users);
    return joinedData;
  }

  getJobForPage(jobId: string) {
    const job = this.firestore
      .doc<JobOffer>(`jobOffers/${jobId}`)
      .valueChanges() as Observable<JobOffer>;
    const users = this.firestore.collection<User>('users').valueChanges();
    const joinedData = zip(job, users);
    return joinedData;
  }
}
