export interface InitialState {
  email: string;
  nickname: string;
  accessToken: string;
}

export interface ISignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignInResponse {
  email: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
}
