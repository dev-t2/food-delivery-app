/* eslint-disable no-useless-escape */

export function isValidateEmail(email: string) {
  const regExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{10,})$/;

  return regExp.test(email);
}

export function isValidatePassword(password: string) {
  const regExp = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,16}$/;

  return regExp.test(password);
}
