import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Title, Box, SemiBold } from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import { NavigationButtons } from '../../../components/navigationButtons';
import { SecondaryButton } from '../../../components/button';
import { ScreenContainer } from '../../../components/screenContainer';
import { getCurrentUserprofile } from '../../../redux/actions/getUserprofiles';

const AccessExistingFlatProfile = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { userprofile } = useSelector((state) => state.userprofileState);

    const partOfFlat = () => {
        if (userprofile.flatId) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <ScreenContainer>
            <Box style={styles.box}>
                <Title style={styles.text}>{en.accessExisting.heading}</Title>
                {partOfFlat ? (
                    <Box style={styles.inner}>
                        <SemiBold style={styles.text}>
                            {en.accessExisting.failure}
                        </SemiBold>
                        <Box />
                        <SecondaryButton
                            onPress={() => {
                                dispatch(getCurrentUserprofile());
                            }}
                        >
                            Reload
                        </SecondaryButton>
                    </Box>
                ) : (
                    <Box style={styles.box}>
                        <SemiBold style={styles.text}>
                            {en.accessExisting.success}
                        </SemiBold>
                    </Box>
                )}
            </Box>
            <NavigationButtons
                onPressBack={() => navigation.goBack()}
                onPressNext={() => {
                    navigation.navigate(
                        'CompletePersonalProfile',
                        'accessFlat'
                    );
                }}
                nextDisabled={partOfFlat() != true}
            />
        </ScreenContainer>
    );
};
export default AccessExistingFlatProfile;
