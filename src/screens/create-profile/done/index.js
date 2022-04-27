import { updateUserprofile } from '../../../redux/actions/updateUserprofile';
import React, { useState } from 'react';
import { colors } from 'react-native-elements';
import Loader from 'react-native-modal-loader';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import {
    Box,
    Container,
    Heading,
    Inner,
    ScreenPadding,
    Title,
} from '../../../components/theme';
import en from '../../../resources/strings/en.json';

const Done = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.loadingState);
    const { transitUserprofile } = useSelector((state) => state.transitState);

    const updateSingleprofile = () => {
        console.log(transitUserprofile);
        delete transitUserprofile.localPictureReference;
        dispatch(updateUserprofile(transitUserprofile));
    };

    const updateFlatprofile = () => {};

    const joinFlat = () => {};

    return (
        <Container onPressBack={() => navigation.goBack()}>
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
                            else updateFlatprofile();
                        }}
                    >
                        {en.done.start}
                    </PrimaryButton>
                </Inner>
            </ScreenPadding>
        </Container>
    );
};
export default Done;
