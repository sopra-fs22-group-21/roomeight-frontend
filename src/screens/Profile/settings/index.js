import React from 'react';
import { ScreenContainer } from '../../../components/screenContainer';
import { Inner, SmallHeadingWithBack } from '../../../components/theme';
import en from '../../../resources/strings/en.json';

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
