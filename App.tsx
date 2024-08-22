import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import  firebase  from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCDqBibNoHYjZnIcqpwesUmCmOyvbhfiXk',
  authDomain: 'farming-f3285.firebaseapp.com',
  projectId: 'farming-f3285',
  storageBucket: 'farming-f3285.appspot.com',
  messagingSenderId: '135925086286',
  appId: '1:135925086286:android:615467cff9aab25e982b1f',
  measurementId: 'G-XXXXXXXXXX' // Add your actual measurementId here if needed
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App: React.FC = () => {
  return <AppNavigator />;
};

export default App;
