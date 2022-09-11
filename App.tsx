import React, { memo, useLayoutEffect } from 'react';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from 'react-native-push-notification';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';

import store from './src/store';
import theme from './src/utils/theme';
import RootScreen from './src/screens';

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'riders',
    channelName: 'common',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

function App() {
  useLayoutEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          title: '업데이트 안내',
          mandatoryUpdateMessage: '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
          mandatoryContinueButtonLabel: '재시작',
        },
      },
      status => {
        console.log(`Changed ${status}`);
      },
    ).then(status => {
      console.log(`CodePush ${status}`);
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootScreen />
      </ThemeProvider>
    </Provider>
  );
}

export default memo(CodePush(codePushOptions)(App));
