import M8Logo from '../../../assets/logo/m8.svg';
import { View, Text } from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function SplashScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Splash</Text>
        <SvgUri width={200} height={200} uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"/>
        </View>
    );
}