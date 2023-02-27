export interface User {
  uid: string;
  email: string;
  displayName: string;
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
};
