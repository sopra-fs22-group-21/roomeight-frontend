import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryButton } from '../../../components/button';
import { NavigationButtons } from '../../../components/navigationButtons';
import { Profiles } from '../../../components/profiles';
import { ScreenContainer } from '../../../components/screenContainer';
import { Box, SemiBold, Title } from '../../../components/theme';
import { getCurrentUserprofile } from '../../../redux/actions/getUserprofiles';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const AccessExistingFlatProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);

    const partOfFlat = () => {
        return Boolean(userprofile.flatId);
    };

    return (
        <ScreenContainer>
            <Box style={styles.box}>
                <Title style={styles.text}>{en.accessExisting.heading}</Title>
                {!partOfFlat() ? (
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
                        <Box />
                        <Profiles profiles={[flatprofile]} />
                    </Box>
                )}
            </Box>

            <NavigationButtons
                onPressBack={partOfFlat() ? null : () => navigation.goBack()}
                onPressNext={() => {
                    navigation.navigate(
                        'CompletePersonalProfile',
                        'accessFlat'
                    );
                }}
                nextDisabled={!partOfFlat()}
            />
        </ScreenContainer>
    );
};
export default AccessExistingFlatProfile;
