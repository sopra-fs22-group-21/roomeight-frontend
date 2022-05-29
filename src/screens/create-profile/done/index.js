import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Heading,
    Inner,
    ScreenPadding,
    Title,
} from '../../../components/theme';
import { updateProfile } from '../../../redux/actions/updateActions';
import { ENTER_APP_LOADING } from '../../../redux/constants';
import en from '../../../resources/strings/en.json';

const Done = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const { transitUserprofile, transitFlatprofile } = useSelector(
        (state) => state.transitState
    );

    const updateSingleprofile = async () => {
        return dispatch(
            updateProfile(
                transitUserprofile,
                'userprofile',
                userprofile.profileId
            )
        );
    };

    return (
        <ScreenContainer onPressBack={() => navigation.goBack()}>
            <ScreenPadding>
                <Inner>
                    <Heading>{en.done.heading}</Heading>
                    <Title>{en.done.title}</Title>
                    <Box />

                    <Box />
                    <PrimaryButton
                        onPress={async () => {
                            const flatId = flatprofile.profileId;
                            dispatch({
                                type: ENTER_APP_LOADING,
                            });
                            if (
                                route.params.includes('flat') ||
                                userprofile.isAdvertisingRoom
                            ) {
                                dispatch(
                                    updateProfile(
                                        transitFlatprofile,
                                        'flatprofile',
                                        flatId
                                    )
                                ).then(() => {
                                    if (transitFlatprofile.roommateEmails) {
                                        transitFlatprofile.roommateEmails.forEach(
                                            (email) => {
                                                dispatch(
                                                    postRoommateToFlat(email)
                                                );
                                            }
                                        );
                                    }
                                    navigation.navigate('Discover');
                                });
                            }
                            if (
                                route.params.includes('single') ||
                                !userprofile.isComplete
                            ) {
                                updateSingleprofile().then(() =>
                                    navigation.navigate('Discover')
                                );
                            }
                        }}
                    >
                        {en.done.start}
                    </PrimaryButton>
                </Inner>
            </ScreenPadding>
        </ScreenContainer>
    );
};
export default Done;
