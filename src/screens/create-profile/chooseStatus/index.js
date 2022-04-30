import React from 'react';
import { SecondaryButton } from '../../../components/button';
import { Box, Heading, Inner, TextBlock } from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import { useDispatch } from 'react-redux';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import { ScreenContainer } from '../../../components/screenContainer';

const ChooseStatus = ({ navigation }) => {
    return (
        <ScreenContainer showLogout>
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

                <SecondaryButton
                    onPress={() => {
                        navigation.navigate('AccessExistingFlatProfile');
                    }}
                >
                    {en.chooseStatus.flat}
                </SecondaryButton>
                <Box />
            </Inner>
        </ScreenContainer>
    );
};
export default ChooseStatus;
