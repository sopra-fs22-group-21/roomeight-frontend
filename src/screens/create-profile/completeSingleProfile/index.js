import dateFormat from 'dateformat';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import DateInput from '../../../components/dateInput';
import { InputBox } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import Tags from '../../../components/tags';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import genders from '../../../resources/strings/genders';
import styles from './styles';

const CompleteSingleProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const [gender, setGender] = useState(genders.notSet);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    let selectedTags = [];
    return (
        <Container
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                dispatch(setTransitAttributes({ ...user }, 'userprofile'));
                navigation.navigate('AddProfilePicture', 'single');
            }}
            nextDisabled={false}
        >
            <ScreenPadding>
                <Heading>{en.completeSingleProfile.heading}</Heading>
                <NormalText>{en.completeSingleProfile.info}</NormalText>
                <Box />
                <KeyboardAvoidingView style={styles.inner} behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <DateInput
                            label={en.completeSingleProfile.moveInDate}
                            valid={moveInDateValid}
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        moveInDate: dateFormat(
                                            date,
                                            'yyyy-mm-dd'
                                        ),
                                    });
                                setmoveInDateValid(valid && date > new Date());
                            }}
                        />

                        <InputBox label={'Tags'}>
                            <Tags
                                onChange={(tags) =>
                                    setUser({ ...user, tags: tags })
                                }
                            />
                        </InputBox>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenPadding>
        </Container>
    );
};
export default CompleteSingleProfile;
