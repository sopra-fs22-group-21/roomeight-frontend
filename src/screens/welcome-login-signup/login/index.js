import React, { useState } from 'react';
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
import styles from './styles';
import Loading from '../../loading';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authErrors } = useSelector((state) => state.errorState);
    const [dispatched, setDispatched] = useState(false);
    const { loading, loggedIn } = useSelector((state) => state.authState);

    return (
        <>
            {loading || loggedIn ? (
                <Loading />
            ) : (
                <ScreenContainer onPressBack={() => navigation.goBack()}>
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
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setDispatched(false);
                                }}
                            />
                            <Input
                                label={en.login.password}
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setDispatched(false);
                                }}
                            />
                            {authErrors.infoForUser && dispatched ? (
                                <>
                                    <Box />
                                    <TextBlock style={styles.error}>
                                        {authErrors.infoForUser}
                                    </TextBlock>
                                </>
                            ) : null}

                            <Box />
                            <PrimaryButton
                                onPress={() => {
                                    setDispatched(true);
                                    dispatch(loginUser(email, password));
                                }}
                            >
                                Login
                            </PrimaryButton>
                        </KeyboardAwareScrollView>
                    </ScreenPadding>
                </ScreenContainer>
            )}
        </>
    );
};
export default Login;
//<Loader loading={loading} color={colors.secondary500} />
