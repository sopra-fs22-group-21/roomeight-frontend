import React, { useEffect } from 'react';
import { SecondaryButton } from '../../../components/button';
import { NavigationButtons } from '../../../components/navigationButtons';
import {
    Box,
    Container,
    Heading,
    Inner,
    TextBlock,
    Title,
} from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import { useDispatch, useSelector } from 'react-redux';
import en from '../../../resources/strings/en.json';
import { updateUserprofile } from '../../../redux/actions/updateUserprofile';
import styles from './styles';

const ChooseStatus = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { transitUserprofile, profileCompletionStatus } = useSelector(
        (state) => state.transitState
    );

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
                        navigation.navigate('CompleteFlatProfile');
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
