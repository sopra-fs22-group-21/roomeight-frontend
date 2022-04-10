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
import { Gender } from '../../components/gender';
import Tags from '../../components/tags';

const CompleteSingleProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    let selectedTags = [];
    return (
        <Container>
            <Heading>{en.chooseStatus.heading}</Heading>
            <Title>{en.chooseStatus.title}</Title>
            <TextBlock>{en.chooseStatus.select}</TextBlock>
            <Inner>
                <InputBox label={en.completeSingleProfile.gender}>
                    <Gender />
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
                <Tags onChange={(tags) => console.log(tags)} />
            </Inner>
        </Container>
    );
};
export default CompleteSingleProfile;
