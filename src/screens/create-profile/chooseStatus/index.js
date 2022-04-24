import React from 'react';
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

const ChooseStatus = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);

    return (
        <Container showLogout>
            <Heading>{en.chooseStatus.heading}</Heading>
            <Box>
                <Title>{en.chooseStatus.title}</Title>
            </Box>
            <TextBlock>{en.chooseStatus.select}</TextBlock>
            <Inner>
                <Box>
                    <SecondaryButton
                        onPress={() => {
                            dispatch(
                                setTransitAttributes(
                                    { isSearchingRoom: true },
                                    'userprofile'
                                )
                            );
                            navigation.navigate('CompleteSingleProfile');
                        }}
                    >
                        {en.chooseStatus.room}
                    </SecondaryButton>
                </Box>
                <Box>
                    <SecondaryButton
                        onPress={() => {
                            dispatch(
                                setTransitAttributes(
                                    { isSearchingAdvertisingRoom: true },
                                    'userprofile'
                                )
                            );
                            navigation.navigate('CompleteFlatProfile');
                        }}
                    >
                        {en.chooseStatus.roommate}
                    </SecondaryButton>
                </Box>
                <Box>
                    <SecondaryButton
                        onPress={() => {
                            console.log('dispatching?');
                            dispatch(updateUserprofile(userprofile));
                        }}
                    >
                        {en.chooseStatus.flat}
                    </SecondaryButton>
                </Box>
            </Inner>
            <NavigationButtons onPressBack={() => navigation.goBack()} />
        </Container>
    );
};
export default ChooseStatus;
