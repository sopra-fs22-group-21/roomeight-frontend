import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import en from '../../../resources/strings/en.json';

const ChooseStatus = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container showLogout>
            <Heading>{en.chooseStatus.heading}</Heading>
            <Title>{en.chooseStatus.title}</Title>
            <TextBlock>{en.chooseStatus.select}</TextBlock>
            <Inner>
                <Box>
                    <SecondaryButton
                        onPress={() =>
                            navigation.navigate('CompleteSingleProfile')
                        }
                    >
                        {en.chooseStatus.room}
                    </SecondaryButton>
                </Box>
                <Box>
                    <SecondaryButton
                        onPress={() =>
                            navigation.navigate('CompleteFlatProfile')
                        }
                    >
                        {en.chooseStatus.roommate}
                    </SecondaryButton>
                </Box>
                <Box>
                    <SecondaryButton>{en.chooseStatus.flat}</SecondaryButton>
                </Box>
            </Inner>
            <NavigationButtons onPressBack={() => navigation.goBack()} />
        </Container>
    );
};
export default ChooseStatus;
