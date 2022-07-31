import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SignParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<SignParamList, 'SignIn'>;
