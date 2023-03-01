import { FormControl, ValidationErrors } from '@angular/forms';
import { errorCodes } from '../services/types';

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

export const getErrorFromForm = (
  formControl: FormControl<string | number | boolean | null>
) => {
  const errors = formControl.errors as ValidationErrors;
  const firstError = Object.entries(errors)[0];
  console.log(firstError);
  if (firstError[0] === 'firebaseError') {
    return firstError[1];
  } else if (firstError[0] === 'required') {
    return 'Field is required';
  } else if (firstError[0] === 'minlength') {
    return `Field should be at least ${firstError[1].requiredLength} characters long`;
  } else if (firstError[0] === 'email') {
    return 'Enter valid email';
  } else if (firstError[0] === 'min') {
    return `Value has to be greater than ${firstError[1].min}`;
  } else {
    return 'Unknown error has occured';
  }
};
