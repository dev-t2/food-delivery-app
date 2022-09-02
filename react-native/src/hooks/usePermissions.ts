import { useLayoutEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

function usePermissions() {
  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              'Location permission is required',
              'Please always set the location permission to Allow on the Settings screen',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => console.log('No Pressed'),
                },
              ],
            );
          }
        })
        .catch(console.error);
    }

    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            throw new Error('No camera support');
          }
        })
        .catch(console.error);
    }

    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              'Allow background location permissions is required',
              'Please always set the location permission to Allow on the Settings screen',
              [
                {
                  text: 'Yes',
                  style: 'default',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: 'No',
                  style: 'cancel',
                  onPress: () => console.log('No Pressed'),
                },
              ],
            );
          }
        })
        .catch(console.error);
    }

    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (
            result === RESULTS.DENIED ||
            result === RESULTS.LIMITED ||
            result === RESULTS.GRANTED
          ) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else {
            throw new Error('No camera support');
          }
        })
        .catch(console.error);
    }
  }, []);
}

export default usePermissions;
