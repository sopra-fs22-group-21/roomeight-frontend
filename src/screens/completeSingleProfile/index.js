import React, { useState } from 'react';
import styles from './style';
import en from '../../resources/strings/en.json';
import { Input, InputBox } from '../../components/input';
import {
    TextBlock,
    Heading,
    Box,
    Title,
    Container,
    Inner,
} from '../../components/theme';
import { Button, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import DateInput from '../../components/dateInput';
import dateFormat from 'dateformat';

const CompleteSingleProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    return (
        <Container>
            <Heading>{en.chooseStatus.heading}</Heading>
            <Title>{en.chooseStatus.title}</Title>
            <TextBlock>{en.chooseStatus.select}</TextBlock>
            <Inner>
                <InputBox label={en.completeSingleProfile.gender}>
                    <Text>Hello</Text>
                </InputBox>
                <DateInput
                    label={en.completeSingleProfile.moveInDate}
                    valid={moveInDateValid}
                    error={moveInDateValid === false}
                    dataDetectorTypes="calendarEvent"
                    onChange={(date, valid) => {
                        if (valid)
                            setUser({
                                ...user,
                                moveInDate: dateFormat(date, 'yyyy-mm-dd'),
                            });
                        setmoveInDateValid(valid);
                    }}
                />
                <Text></Text>
            </Inner>
        </Container>
    );
};
export default CompleteSingleProfile;
