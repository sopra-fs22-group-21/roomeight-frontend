import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import { Input } from '../../../components/input';
import {
    Heading,
    Inner,
    SmallHeadingWithBack,
} from '../../../components/theme';
import { loginUser } from '../../../redux/actions/authActions';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import { NavigationButtons } from '../../../components/navigationButtons';
import { ScreenContainer } from '../../../components/screenContainer';

const Settings = ({ navigation }) => {
    return (
        <ScreenContainer showLogout>
            <SmallHeadingWithBack navigation={navigation}>
                {en.settings.heading}
            </SmallHeadingWithBack>
            <Inner />
        </ScreenContainer>
    );
};
export default Settings;
