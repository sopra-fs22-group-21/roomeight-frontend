import React, { useState } from 'react';
import { View, Button } from 'react-native';
import styles from './style';
import en from '../../resources/strings/en.json';
import {
    TextBlock,
    Heading,
    Title,
    Box,
    Container,
} from '../../components/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from '../../components/input';
import { PrimaryButton, SecondaryButton } from '../../components/button';
import { loginUser } from '../../redux/actions/loginUser';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <Container>
            <Heading>{en.login.heading}</Heading>
            <Title>{en.login.title}</Title>
            <KeyboardAwareScrollView
                style={styles.inner}
                showsVerticalScrollIndicator={false}
            >
                <TextBlock>{en.login.enterDetails}</TextBlock>
                <Input
                    label={en.login.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    label={en.login.password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <PrimaryButton
                    onPress={() => {
                        dispatch(loginUser(email, password));
                    }}
                >
                    Log In
                </PrimaryButton>
                <SecondaryButton onPress={() => navigation.navigate('Signup')}>
                    Don't have an account yet
                </SecondaryButton>
            </KeyboardAwareScrollView>
        </Container>
    );
};
export default Login;
