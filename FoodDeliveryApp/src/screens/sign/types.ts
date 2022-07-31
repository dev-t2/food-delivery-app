import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
