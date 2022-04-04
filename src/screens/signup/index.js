import React, { useState } from 'react';
import styles from './style';
import en from '../../resources/strings/en.json';
import { postUserprofile } from '../../redux/actions/postUserprofile';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    View,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    Text,
} from 'react-native';
import { TextBlock, Heading, Title, Box } from '../../components/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from '../../components/input';
import { PrimaryButton } from '../../components/button';
import DateInput from '../../components/dateInput';
import dateFormat from 'dateformat';
import Userprofile from '../../models/Userprofile';

const Signup = ({ navigation }) => {
    const [user, setUser] = useState(new Userprofile());
    const [repeat, setRepeat] = useState('');
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [password, setPassword] = useState('');
    const [repeatValid, setRepeatValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);
    const [birthdayValid, setBirthdayValid] = useState(null);

    const emailRegex =
        /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const phoneRegex =
        /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;

    const { loading, userProfile, error } = useSelector(
        (state) => state.userprofileState
    );
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.inner} behavior="height">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Heading>{en.signup.welcome}</Heading>
                    <Title>{en.signup.title}</Title>
                    <TextBlock>{en.signup.enterDetails}</TextBlock>
                    <Input
                        label={en.signup.email}
                        valid={emailValid}
                        error={emailValid === false}
                        onEndEditing={() =>
                            setEmailValid(emailRegex.test(user.email))
                        }
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
                        onEndEditing={() =>
                            setPasswordValid(password.length >= 8)
                        }
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
                        onEndEditing={() =>
                            setRepeatValid(
                                password == user.password && passwordValid
                            )
                        }
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
                        autoCapitalize="words"
                        onChangeText={(text) =>
                            setUser({ ...user, firstName: text })
                        }
                    />
                    <Input
                        label={en.signup.lastname}
                        valid={user.lastName && user.lastName != ''}
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
                        onEndEditing={() =>
                            setPhoneValid(phoneRegex.test(user.phoneNumber))
                        }
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
                            setUser({ ...user, birthday: date });
                            setBirthdayValid(valid);
                        }}
                    />

                    <PrimaryButton
                        /* disabled={
                            !emailValid ||
                            !passwordValid ||
                            !repeatValid ||
                            user.firsName == '' ||
                            user.lastName == '' ||
                            !birthdayValid
                        } */
                        onPress={() => {
                            dispatch(postUserprofile(user));
                            console.log('posting');
                            console.log(user);
                        }}
                    >
                        Sign Up
                    </PrimaryButton>
                    <Button
                        title="Already have an account"
                        onPress={() => navigation.navigate('Login')}
                    />
                    <Text>isLoading: {loading.toString()}</Text>
                    <Text>Userprofile: {JSON.stringify(userProfile)}</Text>
                    <Text>Error: {JSON.stringify(error)}</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
export default Signup;
