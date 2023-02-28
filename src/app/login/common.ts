import { FormControl } from '@angular/forms';
import { errorCodes } from '../services/auth/auth';

export const setErrors = (
  errorCode: string,
  formControl: {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }
) => {
  if (
    errorCode === 'auth/invalid-email' ||
    errorCode === 'auth/email-already-exists'
  ) {
    formControl.email.setErrors({
      firebaseError: errorCodes[errorCode],
    });
  } else if (
    errorCode === 'auth/invalid-password' ||
    errorCode === 'auth/wrong-password'
  ) {
    formControl.password.setErrors({
      firebaseError: errorCodes[errorCode],
    });
  } else {
    formControl.email.setErrors({
      firebaseError: 'Something went wrong',
    });
  }
};
