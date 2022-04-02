import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/compat/app';
import {firebaseConfig} from './firebase/firebase-config.js';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Route from './src/navigation/main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    SSBlack: require('./assets/fonts/SourceSans3-Black.ttf'),
    SSBlackItalic: require('./assets/fonts/SourceSans3-BlackItalic.ttf'),
    SSBold: require('./assets/fonts/SourceSans3-Bold.ttf'),
    SSBoldItalic: require('./assets/fonts/SourceSans3-BoldItalic.ttf'),
    SSExtraBold: require('./assets/fonts/SourceSans3-ExtraBold.ttf'),
    SSExtraBoldItalic: require('./assets/fonts/SourceSans3-ExtraBoldItalic.ttf'),
    SSExtraLight: require('./assets/fonts/SourceSans3-ExtraLight.ttf'),
    SSExtraLightItalic: require('./assets/fonts/SourceSans3-ExtraLightItalic.ttf'),
    SSItalic: require('./assets/fonts/SourceSans3-Italic.ttf'),
    SSLight: require('./assets/fonts/SourceSans3-Light.ttf'),
    SSLightItalic: require('./assets/fonts/SourceSans3-LightItalic.ttf'),
    SSMedium: require('./assets/fonts/SourceSans3-Medium.ttf'),
    SSMediumItalic: require('./assets/fonts/SourceSans3-MediumItalic.ttf'),
    SSRegular: require('./assets/fonts/SourceSans3-Regular.ttf'),
    SSSemiBold: require('./assets/fonts/SourceSans3-SemiBold.ttf'),
    SSSemiBoldItalic: require('./assets/fonts/SourceSans3-SemiBoldItalic.ttf'),
  });
  
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
