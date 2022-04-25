import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import DateInput from '../../../components/dateInput';
import { Input } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import {
    Box,
    Container,
    Heading,
    ScreenPadding,
    TextBlock,
    Title,
} from '../../../components/theme';
import { postUserprofile } from '../../../redux/actions/postUserprofile';
import en from '../../../resources/strings/en.json';
import Loader from 'react-native-modal-loader';
import styles from './styles';
import colors from '../../../resources/colors';

const Signup = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [password, setPassword] = useState('');
    const [repeatValid, setRepeatValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);
    const [birthdayValid, setbirthdayValid] = useState(null);
    const { userprofileErrors, authErrors } = useSelector(
        (state) => state.errorState
    );
    const { loading } = useSelector((state) => state.loadingState);
    const [heading, setHeading] = useState(en.signup.heading);
    const [title, setTitle] = useState(en.signup.title);
    const [text, setText] = useState(en.signup.enterDetails);
    const [isSecondPage, setIsSecondPage] = useState(false);

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const phoneRegex =
        /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;

    const dispatch = useDispatch();

    const firstPageInputs = (
        <>
            <Input
                key="email"
                label={en.signup.email}
                value={user.email}
                error={
                    emailValid === false || userprofileErrors.postUserprofile
                }
                onEndEditing={() => {
                    if (user.email != '')
                        setEmailValid(emailRegex.test(user.email));
                }}
                valid={emailValid}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                    setUser({ ...user, email: text });
                    if (emailRegex.test(text)) setEmailValid(true);
                    else setEmailValid(null);
                }}
            />
            <Input
                key="password"
                label={en.signup.password}
                value={password}
                valid={passwordValid}
                error={passwordValid === false}
                onEndEditing={() => {
                    if (password != '') setPasswordValid(password.length >= 8);
                }}
                onChangeText={(text) => {
                    setPassword(text);
                    if (text.length >= 8) setPasswordValid(true);
                    else setPasswordValid(null);
                }}
                secureTextEntry={true}
            />
            <Input
                key="repeat"
                label={en.signup.repeatPassword}
                value={user.password}
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
                    if (text.length >= password.length && password != text)
                        setRepeatValid(false);
                    else if (text == password) setRepeatValid(true);
                    else setRepeatValid(null);
                }}
            />
        </>
    );

    const secondPageInputs = (
        <>
            <Input
                key="firstName"
                value={user.firstName}
                label={en.signup.firstname}
                valid={user.firstName && user.firstName != ''}
                autoComplet="name-given"
                autoCapitalize="words"
                onChangeText={(text) => setUser({ ...user, firstName: text })}
            />
            <Input
                key="lastName"
                value={user.lastName}
                label={en.signup.lastname}
                valid={user.lastName && user.lastName != ''}
                autoComplet="name-family"
                autoCapitalize="words"
                onChangeText={(text) => setUser({ ...user, lastName: text })}
            />
            <Input
                key="phone"
                value={user.phoneNumber}
                label={en.signup.phone}
                keyboardType="phone-pad"
                valid={phoneValid}
                error={phoneValid === false}
                dataDetectorTypes="phoneNumber"
                onEndEditing={() => {
                    if (user.phoneNumber != '')
                        setPhoneValid(phoneRegex.test(user.phoneNumber));
                }}
                onChangeText={(text) => {
                    setUser({ ...user, phoneNumber: text });
                    if (phoneRegex.test(text)) setPhoneValid(true);
                    else setPhoneValid(null);
                }}
            />
            <DateInput
                value={user.birthday}
                label={en.signup.birthday}
                valid={birthdayValid}
                error={birthdayValid === false}
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
                    setIsSecondPage(false);
                    setEmailValid(false);
                }}
            >
                Sign Up
            </PrimaryButton>
        </>
    );

    return (
        <Container>
            <ScreenPadding>
                <Loader loading={loading} color={colors.secondary500} />
                <KeyboardAvoidingView behavior="position">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{heading}</Heading>
                        <Box>
                            <Title>{title}</Title>
                        </Box>
                        <TextBlock>{text}</TextBlock>
                        {isSecondPage ? secondPageInputs : firstPageInputs}
                        {userprofileErrors.infoForUser && !emailValid ? (
                            <>
                                <Box />
                                <TextBlock style={styles.error}>
                                    {userprofileErrors.infoForUser}
                                </TextBlock>
                            </>
                        ) : null}
                    </ScrollView>
                </KeyboardAvoidingView>
                {!isSecondPage ? (
                    <NavigationButtons
                        onPressBack={() => navigation.goBack()}
                        onPressNext={() => {
                            setHeading(en.signup.title);
                            setTitle(en.signup.almostDone);
                            setText('');
                            setIsSecondPage(true);
                        }}
                        nextDisabled={
                            !emailValid || !repeatValid || !passwordValid
                        }
                    />
                ) : (
                    <NavigationButtons
                        onPressBack={() => setIsSecondPage(false)}
                    />
                )}
            </ScreenPadding>
        </Container>
    );
};
export default Signup;
