import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/compat/app';
import {firebaseConfig} from './firebase/firebase-config.js';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Route from './src/navigation/main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//const store = createStore(rootReducer, applyMiddleware(thunk));

if(firebase.app.length === 0){
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //<Provider store={store}>
    <Route />
    //</Provider>
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
