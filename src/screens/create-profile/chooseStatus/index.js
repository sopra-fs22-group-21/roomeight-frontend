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
    const dispatch = useDispatch();

    return (
        <Container showLogout>
            <Inner style={styles.inner}>
                <Heading>{en.chooseStatus.heading}</Heading>
                <Box />
                <TextBlock>{en.chooseStatus.select}</TextBlock>
                <Box />
                <SecondaryButton
                    onPress={() => {
                        dispatch(
                            setTransitAttributes(
                                { isSearchingRoom: true },
                                'userprofile',
                                { isSingleRoomie: true }
                            )
                        );
                        navigation.navigate('CompleteSingleProfile');
                    }}
                >
                    {en.chooseStatus.room}
                </SecondaryButton>
                <Box />
                <SecondaryButton
                    onPress={() => {
                        dispatch(
                            setTransitAttributes(
                                { isAdvertisingRoom: true },
                                'userprofile',
                                { isFlat: true }
                            )
                        );
                        navigation.navigate('RoomInfo');
                    }}
                >
                    {en.chooseStatus.roommate}
                </SecondaryButton>
                <Box />

                <SecondaryButton
                    onPress={() => {
                        dispatch(
                            setTransitAttributes(
                                { isAdvertisingRoom: true },
                                'userprofile',
                                { joinsFlat: true }
                            )
                        );
                        navigation.navigate('AccessExistingFlatProfile');
                    }}
                >
                    {en.chooseStatus.flat}
                </SecondaryButton>
                <Box />
            </Inner>
        </Container>
    );
};
export default ChooseStatus;
