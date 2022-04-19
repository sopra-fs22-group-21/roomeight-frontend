import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import { Input } from '../../../components/input';
import {
    Container,
    Heading,
    TextBlock,
    Title,
} from '../../../components/theme';
import { loginUser } from '../../../redux/actions/authActions';
import en from '../../../resources/strings/en.json';
import styles from './styles';

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
                    Login
                </PrimaryButton>
            </KeyboardAwareScrollView>
        </Container>
    );
};
export default Login;
