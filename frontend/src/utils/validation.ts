/* eslint-disable no-useless-escape */

export function validateEmail(email: string) {
  const regExp =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

  return regExp.test(email);
}

export function validatePassword(password: string) {
  const regExp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,16}$/;

  return regExp.test(password);
}
