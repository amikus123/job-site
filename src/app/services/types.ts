// user stored in db
import firebase from 'firebase/compat/app';
export interface User {
  uid: string;
  email: string;
  username: string;
  photoURL: string;
  isEmployer: boolean;
}
export interface Employer extends User {
  isEmployer: true;
}

export interface Employee extends User {
  isEmployer: false;
}

export const errorCodes = {
  'auth/invalid-email': 'Enter valid email',
  'auth/invalid-password': 'Password should be 6 characters long',
  'auth/email-already-exists': 'Email is already in use',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
  'auth/email-already-in-use': 'Email is already in use',
};
export interface CustomFirebaseUser extends firebase.User {
  isEmployer: boolean;
}
