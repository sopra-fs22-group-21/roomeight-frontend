import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './style';
import en from '../../resources/strings/en.json';
import Room8Logo from '../../../assets/logo/Room8Logo.js';
import { TextBlock, Box, SemiBold, Padding } from '../../components/theme';
import Constants from 'expo-constants';

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
                
                <TouchableOpacity onPress={() => {
                    console.log("test")
                    console.log(Constants.manifest.releaseChannel)
                    
                }}>
                    <SemiBold>test</SemiBold>
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
