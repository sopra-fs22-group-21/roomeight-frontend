import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../components/button';
import { Input } from '../../../components/input';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Heading,
    ScreenPadding,
    TextBlock,
    Title,
} from '../../../components/theme';
import { loginUser } from '../../../redux/actions/authActions';
import en from '../../../resources/strings/en.json';
import Loading from '../../loading';
import styles from './styles';
import Loader from 'react-native-modal-loader';
import colors from '../../../resources/colors';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typing, setTyping] = useState(true);
    const { authErrors } = useSelector((state) => state.errorState);
    const { loading, loggedIn } = useSelector((state) => state.authState);

    return (
        <>
            {loggedIn ? (
                <Loading />
            ) : (
                <ScreenContainer onPressBack={() => navigation.goBack()}>
                    <Loader loading={loading} color={colors.secondary200} />
                    <ScreenPadding>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <Heading>{en.login.heading}</Heading>
                            <Box>
                                <Title>{en.login.title}</Title>
                            </Box>
                            <TextBlock>{en.login.enterDetails}</TextBlock>
                            <Input
                                label={en.login.email}
                                keyboardType="email-address"
                                value={email}
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setTyping(true);
                                }}
                            />
                            <Input
                                label={en.login.password}
                                secureTextEntry={true}
                                defaultValue={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setTyping(true);
                                }}
                            />
                            <Box />
                            <PrimaryButton
                                onPress={() => {
                                    setTyping(false);
                                    dispatch(loginUser(email, password));
                                }}
                            >
                                Login
                            </PrimaryButton>
                            <Box />
                            {authErrors.infoForUser && typing ? (
                                <>
                                    <Box />
                                    <TextBlock style={styles.error}>
                                        {authErrors.infoForUser}
                                    </TextBlock>
                                </>
                            ) : null}
                        </KeyboardAwareScrollView>
                    </ScreenPadding>
                </ScreenContainer>
            )}
        </>
    );
};
export default Login;
//<Loader loading={loading} color={colors.secondary500} />
