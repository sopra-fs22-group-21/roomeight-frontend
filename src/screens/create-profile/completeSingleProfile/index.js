import dateFormat from 'dateformat';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import DateInput from '../../../components/dateInput';
import { InputBox } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import Tags from '../../../components/tags';
import { Container, Heading } from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import genders from '../../../resources/strings/genders';
import styles from './styles';

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
                        onPressNext={() =>
                            navigation.navigate('AddDescription')
                        }
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default CompleteSingleProfile;
