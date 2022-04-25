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
import styles from './styles';

const Done = ({ navigation }) => {
    const [description, setDescription] = useState(null);
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.loadingState);

    return (
        <Container onPressBack={() => navigation.goBack()}>
            <Loader loading={loading} color={colors.secondary500} />
            <ScreenPadding>
                <Inner>
                    <Heading>{en.done.heading}</Heading>
                    <Title>{en.done.title}</Title>
                    <Box />
                    <Box />
                    <PrimaryButton onPress={() => {}}>
                        {en.done.start}
                    </PrimaryButton>
                </Inner>
            </ScreenPadding>
        </Container>
    );
};
export default Done;
