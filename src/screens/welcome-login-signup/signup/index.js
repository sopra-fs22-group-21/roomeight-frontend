import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import DateInput from '../../../components/dateInput';
import { Input } from '../../../components/input';
import {
    Box,
    Container,
    Heading,
    TextBlock,
    Title,
} from '../../../components/theme';
import Userprofile from '../../../models/Userprofile';
import { postUserprofile } from '../../../redux/actions/postUserprofile';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const Signup = ({ navigation }) => {
    const [user, setUser] = useState(new Userprofile());
    const [repeat, setRepeat] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [password, setPassword] = useState('');
    const [repeatValid, setRepeatValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);
    const [birthdayValid, setbirthdayValid] = useState(null);

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const phoneRegex =
        /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;

    const { loading, userProfile, loggedIn, isComplete, error } = useSelector(
        (state) => state.userprofileState
    );
    const dispatch = useDispatch();

    return (
        <Container onPressBack={() => navigation.goBack()}>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Heading>{en.signup.heading}</Heading>
                    <Title>{en.signup.title}</Title>
                    <TextBlock>{en.signup.enterDetails}</TextBlock>
                    <Input
                        label={en.signup.email}
                        valid={emailValid}
                        error={emailValid === false}
                        onEndEditing={() => {
                            if (user.email != '')
                                setEmailValid(emailRegex.test(user.email));
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            setUser({ ...user, email: text });
                            if (emailRegex.test(text)) setEmailValid(true);
                            else setEmailValid(null);
                        }}
                    />
                    <Input
                        label={en.signup.password}
                        valid={passwordValid}
                        error={passwordValid === false}
                        onEndEditing={() => {
                            if (password != '')
                                setPasswordValid(password.length >= 8);
                        }}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (text.length >= 8) setPasswordValid(true);
                            else setPasswordValid(null);
                        }}
                        secureTextEntry={true}
                    />
                    <Input
                        label={en.signup.repeatPassword}
                        valid={repeatValid}
                        error={repeatValid === false}
                        onEndEditing={() => {
                            if (user.password != '')
                                setRepeatValid(
                                    password == user.password && passwordValid
                                );
                        }}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setUser({ ...user, password: text });
                            if (
                                text.length >= password.length &&
                                password != text
                            )
                                setRepeatValid(false);
                            else if (text == password) setRepeatValid(true);
                            else setRepeatValid(null);
                        }}
                    />
                    <Box />
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
                                    birthday: '1999-06-22',
                                });
                            setbirthdayValid(valid && date <= new Date());
                        }}
                    />
                    <Box>
                        <PrimaryButton
                            disabled={
                                !emailValid ||
                                !passwordValid ||
                                !repeatValid ||
                                user.firstName == '' ||
                                user.lastName == '' ||
                                //!birthdayValid ||
                                !phoneValid
                            }
                            onPress={() => {
                                dispatch(postUserprofile(user));
                                console.log('posting');
                                console.log(error);
                                console.log(userProfile);
                            }}
                        >
                            Sign Up
                        </PrimaryButton>
                    </Box>
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default Signup;
