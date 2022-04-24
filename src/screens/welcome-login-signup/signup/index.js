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

const Signup = ({ navigation }) => {
    const [user, setUser] = useState(null);
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

    const { userprofile } = useSelector((state) => state.userprofileState);
    const dispatch = useDispatch();

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            navigation={navigation}
        >
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <Inner>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{en.signup.heading}</Heading>
                        <Box>
                            <Title>{en.signup.title}</Title>
                        </Box>
                        <TextBlock>{en.signup.enterDetails}</TextBlock>
                        <Input
                            label={en.signup.email}
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
                                        password == user.password &&
                                            passwordValid
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
                    </ScrollView>
                </Inner>
            </KeyboardAvoidingView>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <NavigationButtons
                    onPressBack={() => navigation.goBack()}
                    onPressNext={() =>
                        navigation.navigate('SignupDetails', user)
                    }
                    nextDisabled={!emailValid || !repeatValid || !passwordValid}
                />
            </View>
        </Container>
    );
};
export default Signup;
