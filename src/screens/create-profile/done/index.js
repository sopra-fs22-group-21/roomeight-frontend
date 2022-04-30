import { updateProfile } from '../../../redux/actions/updateActions';
import React, { useState } from 'react';
import { colors } from 'react-native-elements';
import Loader from 'react-native-modal-loader';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import {
    Box,
    Heading,
    Inner,
    ScreenPadding,
    Title,
} from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import { postFlatprofile } from '../../../redux/actions/postFlatprofile';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import { ScreenContainer } from '../../../components/screenContainer';

const Done = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);

    const { loading } = useSelector((state) => state.loadingState);
    const { transitUserprofile, transitFlatprofile } = useSelector(
        (state) => state.transitState
    );

    const updateSingleprofile = () => {
        dispatch(
            updateProfile(
                transitUserprofile,
                'userprofile',
                userprofile.profileId
            )
        );
    };

    const joinFlat = () => {};

    return (
        <ScreenContainer onPressBack={() => navigation.goBack()}>
            <Loader loading={loading} color={colors.secondary500} />
            <ScreenPadding>
                <Inner>
                    <Heading>{en.done.heading}</Heading>
                    <Title>{en.done.title}</Title>
                    <Box />

                    <Box />
                    <PrimaryButton
                        onPress={() => {
                            if (route.params.includes('single'))
                                updateSingleprofile();
                            else if (route.params.includes('join')) joinFlat();
                            else {
                                updateSingleprofile();
                                dispatch(postFlatprofile(transitFlatprofile));
                            }
                            navigation.navigate('Discover');
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
