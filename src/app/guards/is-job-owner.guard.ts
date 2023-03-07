import { JobOffer } from './../utils/jobOffer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsJobOwnerGuard implements CanActivate {
  public loader$ = new Subject<boolean>();
  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.loader$.next(true);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isEmployer = this.auth.isEmployer;
    if (!isEmployer) {
      return false;
    }
    const jobId = route.params['jobId'];
    const userId = this.auth.user$.value?.uid;
    const res = this.afs
      .doc<JobOffer>(`jobOffers/${jobId}`)
      .ref.get()
      .then((doc) => {
        console.log('end');
        this.loader$.next(false);
        return doc.data()?.authorUid === userId;
      });
    return res;
  }
}
