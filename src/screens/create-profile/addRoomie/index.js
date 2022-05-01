import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryButton } from '../../../components/button';
import { Input, InputBox, StyledTextInput } from '../../../components/input';
import Tags from '../../../components/tags';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import { Actionsheet, Center, useDisclose } from 'native-base';
import { ScreenContainer } from '../../../components/screenContainer';
import { AddRoomieInput } from '../../../components/addRoomieInput';

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
