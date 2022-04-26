import { updateUserprofile } from '../../../redux/actions/updateUserprofile';
import React, { useState } from 'react';
import { colors } from 'react-native-elements';
import Loader from 'react-native-modal-loader';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../../../firebase/firebase-config';
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
import styles from './styles';

const Done = ({ navigation, route }) => {
    const [description, setDescription] = useState(null);
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.loadingState);
    const { transitUserprofile, transitFlatprofile } = useSelector(
        (state) => state.transitState
    );
    const { userprofile } = useSelector((state) => state.userprofileState);

    const updateSingleprofile = () => {
        console.log(transitUserprofile);
        delete transitUserprofile.localPictureReference;
        console.log(transitUserprofile);
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
