import React from 'react';
import { SecondaryButton } from '../../../components/button';
import {
    Box,
    Container,
    Heading,
    Inner,
    TextBlock,
} from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import { useDispatch } from 'react-redux';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const ChooseStatus = ({ navigation }) => {
    return (
        <Container showLogout>
            <Inner style={styles.inner}>
                <Heading>{en.chooseStatus.heading}</Heading>
                <Box />
                <TextBlock>{en.chooseStatus.select}</TextBlock>
                <Box />
                <SecondaryButton
                    onPress={() => {
                        navigation.navigate('CompleteSingleProfile');
                    }}
                >
                    {en.chooseStatus.room}
                </SecondaryButton>
                <Box />
                <SecondaryButton
                    onPress={() => {
                        navigation.navigate('CreateFlat');
                    }}
                >
                    {en.chooseStatus.roommate}
                </SecondaryButton>
                <Box />

                <SecondaryButton onPress={() => {}}>
                    {en.chooseStatus.flat}
                </SecondaryButton>
                <Box />
            </Inner>
        </Container>
    );
};
export default ChooseStatus;
