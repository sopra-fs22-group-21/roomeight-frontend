import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { View } from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import DateInput from '../../../components/dateInput';
import { Input } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import {
    Box,
    Container,
    Inner,
    Heading,
    TextBlock,
    Title,
} from '../../../components/theme';
import Userprofile from '../../../models/Userprofile';
import { postUserprofile } from '../../../redux/actions/postUserprofile';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import Loader from 'react-native-modal-loader';
import colors from '../../../resources/colors';

const Signup = ({ route, navigation }) => {
    const [user, setUser] = useState(route.params);
    const [phoneValid, setPhoneValid] = useState(null);
    const [birthdayValid, setbirthdayValid] = useState(null);
    const { userprofileErrors, authErrors } = useSelector(
        (state) => state.errorState
    );
    const { loading } = useSelector((state) => state.loadingState);

    const phoneRegex =
        /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;

    const dispatch = useDispatch();

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            navigation={navigation}
        >
            <Loader loading={loading} color={colors.secondary500} />
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <Inner>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{en.signup.title}</Heading>
                        <TextBlock>{en.signup.almostDone}</TextBlock>
                        <Input
                            label={en.signup.firstname}
                            valid={user.firstName && user.firstName != ''}
                            autoComplet="name-given"
                            autoCapitalize="words"
                            onChangeText={(text) =>
                                setUser({ ...user, firstName: text })
                            }
                        />
                        <Input
                            label={en.signup.lastname}
                            valid={user.lastName && user.lastName != ''}
                            autoComplet="name-family"
                            autoCapitalize="words"
                            onChangeText={(text) =>
                                setUser({ ...user, lastName: text })
                            }
                        />
                        <Input
                            label={en.signup.phone}
                            keyboardType="phone-pad"
                            valid={phoneValid}
                            error={phoneValid === false}
                            dataDetectorTypes="phoneNumber"
                            onEndEditing={() => {
                                if (user.phoneNumber != '')
                                    setPhoneValid(
                                        phoneRegex.test(user.phoneNumber)
                                    );
                            }}
                            onChangeText={(text) => {
                                setUser({ ...user, phoneNumber: text });
                                if (phoneRegex.test(text)) setPhoneValid(true);
                                else setPhoneValid(null);
                            }}
                        />
                        <DateInput
                            label={en.signup.birthday}
                            valid={birthdayValid}
                            error={birthdayValid === false}
                            dataDetectorTypes="calendarEvent"
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        birthday: date,
                                    });
                                setbirthdayValid(valid && date <= new Date());
                            }}
                        />
                        <Box />

                        <PrimaryButton
                            disabled={
                                user.firstName == '' ||
                                user.lastName == '' ||
                                !birthdayValid ||
                                !phoneValid
                            }
                            onPress={() => {
                                dispatch(postUserprofile(user));
                            }}
                        >
                            Sign Up
                        </PrimaryButton>
                        <Box />
                    </ScrollView>
                </Inner>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default Signup;
