import React, { useState } from 'react';
import styles from './style';
import en from '../../../resources/strings/en.json';
import { Input, InputBox } from '../../../components/input';
import {
    TextBlock,
    Heading,
    Box,
    Title,
    Container,
    Inner,
} from '../../../components/theme';
import { Button, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import DateInput from '../../../components/dateInput';
import dateFormat from 'dateformat';
import Gender from '../../../components/gender';
import genders from '../../../resources/strings/genders';
import Tags from '../../../components/tags';
import { NavigationButtons } from '../../../components/navigationButtons';

const CompleteSingleProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const [gender, setGender] = useState(genders.notSet);
    const [user, setUser] = useState(null);
    let selectedTags = [];
    return (
        <Container showLogout>
            <Heading>{en.completeSingleProfile.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <DateInput
                        label={en.completeSingleProfile.moveInDate}
                        valid={moveInDateValid}
                        onChange={(date, valid) => {
                            if (valid)
                                setUser({
                                    ...user,
                                    moveInDate: dateFormat(date, 'yyyy-mm-dd'),
                                });
                            setmoveInDateValid(valid && date > new Date());
                        }}
                    />

                    <InputBox label={'Tags'}>
                        <Tags onChange={(tags) => console.log(tags)} />
                    </InputBox>
                    <NavigationButtons
                        onPressBack={() => navigation.goBack()}
                        onPressNext={() => navigation.navigate('AddPictures')}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default CompleteSingleProfile;
