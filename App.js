import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Welcome to roomeight!</Text>
          <StatusBar style="auto" />
        </View>
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
