export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface Employer extends User {
  isEmployer: true;
}

export interface Employee extends User {
  isEmployer: false;
}
