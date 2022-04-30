import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import { Input } from '../../../components/input';
import {
    Container,
    Heading,
    TextBlock,
    Title,
    Box,
} from '../../../components/theme';
import { loginUser } from '../../../redux/actions/authActions';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import { NavigationButtons } from '../../../components/navigationButtons';

const Settings = ({ navigation }) => {
    return (
        <Container showLogout>
            <Heading>{en.settings.heading}</Heading>
            <NavigationButtons onPressBack={() => navigation.goBack()} />
        </Container>
    );
};
export default Settings;
