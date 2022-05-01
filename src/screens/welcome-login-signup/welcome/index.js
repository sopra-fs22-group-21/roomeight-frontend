import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Room8Logo from '../../../../assets/logo/Room8Logo.js';
import { Box, SemiBold, TextBlock } from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';

function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <Box>
                <View>
                    <Room8Logo />
                </View>
            </Box>
            <TextBlock>{en.welcome.message}</TextBlock>

            <View style={styles.options}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <SemiBold>{en.welcome.signup}</SemiBold>
                </TouchableOpacity>
                <View style={styles.or}>
                    <View style={styles.line} />
                    <SemiBold>{en.welcome.or}</SemiBold>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <SemiBold>{en.welcome.login}</SemiBold>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Welcome;
