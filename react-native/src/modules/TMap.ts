import { NativeModules } from 'react-native';

const { TMap } = NativeModules;

interface ITMap {
  openNavi(name: string, long: string, lat: string, naviVehicle: string): Promise<boolean>;
}

export default TMap as ITMap;
