import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { AddRoomieInput } from '../../../components/addRoomieInput';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const AddRoomie = ({ navigation }) => {
    const [emailValid, setEmailValid] = useState(null);

    return (
        <ScreenContainer
            navigation={navigation}
            //TODO: edit
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                navigation.navigate('AddPictures', 'flat');
            }}
            nextDisabled={emailValid === false}
        >
            <ScreenPadding style={styles.inner}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding">
                        <Heading>{en.addRoomie.heading}</Heading>
                        <NormalText>{en.addRoomie.info}</NormalText>
                        <Box />
                        <AddRoomieInput
                            onChange={(emails, valid) => setEmailValid(true)}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScreenPadding>
        </ScreenContainer>
    );
};
export default AddRoomie;
