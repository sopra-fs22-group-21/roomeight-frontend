import React, { useState } from 'react';
import { View, Button } from 'react-native';
import styles from './style';
import en from '../../resources/strings/en.json';
import { TextBlock, Heading, Title, Box } from '../../components/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from '../../components/input';
import { loginUser } from '../../redux/actions/loginUser';
import { useDispatch } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../../components/button';

const ChooseStatus = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Heading>{en.chooseStatus.heading}</Heading>
            <Title>{en.chooseStatus.title}</Title>
            <TextBlock>{en.chooseStatus.select}</TextBlock>
            <View style={styles.inner}>
                <SecondaryButton>{en.chooseStatus.room}</SecondaryButton>
                <SecondaryButton>{en.chooseStatus.roommate}</SecondaryButton>
                <SecondaryButton>{en.chooseStatus.flat}</SecondaryButton>
            </View>
        </View>
    );
};
export default ChooseStatus;
