import M8Logo from '../../../assets/logo/M8Logo.js';
import { View, Text, Button } from 'react-native';
import styles from './styles';

export default function SplashScreen({ navigation }) {
    return (
        <View style={styles.container}>
        <M8Logo width={100} height={100}/>
        </View>
    );
}