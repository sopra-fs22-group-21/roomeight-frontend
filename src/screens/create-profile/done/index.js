import React from 'react';
import { colors } from 'react-native-elements';
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
import { postFlatprofile } from '../../../redux/actions/postFlatprofile';
import { updateProfile } from '../../../redux/actions/updateActions';
import en from '../../../resources/strings/en.json';
import { StackActions } from '@react-navigation/native';

const Done = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);

    const { loading } = useSelector((state) => state.loadingState);
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
                            console.log('flatid: ' + flatId);
                            if (route.params.includes('flat')) {
                                dispatch(
                                    updateProfile(
                                        transitFlatprofile,
                                        'flatprofile',
                                        flatId
                                    )
                                ).then(() => navigation.navigate('Discover'));
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
