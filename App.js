import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import { StyleSheet } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { Provider } from 'react-redux';
import { firebaseConfig } from './firebase/firebase-config';
import Route from './src/navigation';
import reduxStore from './src/redux/reduxStore.js';

export default function App() {
    Geocoder.init(firebaseConfig.apiKey);
    const [loaded] = useFonts({
        SourceSans3Black: require('./assets/fonts/SourceSans3-Black.ttf'),
        SourceSans3BlackItalic: require('./assets/fonts/SourceSans3-BlackItalic.ttf'),
        SourceSans3Bold: require('./assets/fonts/SourceSans3-Bold.ttf'),
        SourceSans3BoldItalic: require('./assets/fonts/SourceSans3-BoldItalic.ttf'),
        SourceSans3ExtraBold: require('./assets/fonts/SourceSans3-ExtraBold.ttf'),
        SourceSans3ExtraBoldItalic: require('./assets/fonts/SourceSans3-ExtraBoldItalic.ttf'),
        SourceSans3ExtraLight: require('./assets/fonts/SourceSans3-ExtraLight.ttf'),
        SourceSans3ExtraLightItalic: require('./assets/fonts/SourceSans3-ExtraLightItalic.ttf'),
        SourceSans3Italic: require('./assets/fonts/SourceSans3-Italic.ttf'),
        SourceSans3Light: require('./assets/fonts/SourceSans3-Light.ttf'),
        SourceSans3LightItalic: require('./assets/fonts/SourceSans3-LightItalic.ttf'),
        SourceSans3Medium: require('./assets/fonts/SourceSans3-Medium.ttf'),
        SourceSans3MediumItalic: require('./assets/fonts/SourceSans3-MediumItalic.ttf'),
        SourceSans3Regular: require('./assets/fonts/SourceSans3-Regular.ttf'),
        SourceSans3SemiBold: require('./assets/fonts/SourceSans3-SemiBold.ttf'),
        SourceSans3SemiBoldItalic: require('./assets/fonts/SourceSans3-SemiBoldItalic.ttf'),
    });

    if (!loaded) return null;

    return (
        <NativeBaseProvider>
            <Provider store={reduxStore}>
                <NavigationContainer>
                    <Route />
                </NavigationContainer>
            </Provider>
        </NativeBaseProvider>
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
