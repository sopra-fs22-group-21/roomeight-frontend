import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '../../../components/button';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
    SmallHeadingWithBack,
} from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';
import { ScreenContainer } from '../../../components/screenContainer';
import { AddRoomieInput } from '../../../components/addRoomieInput';
import { postRoommateToFlat } from '../../../redux/actions/postFlatprofile';

const AddRoomie = ({ navigation, route }) => {
    const [emailValid, setEmailValid] = useState(null);
    const profileRoot = route.params.includes('profile');
    const { loading } = useSelector((state) => state.loadingState);
    const dispatch = useDispatch();
    const { transitFlatprofile } = useSelector((state) => state.transitState);

    if (profileRoot) {
        return (
            <ScreenContainer>
                <View style={styles.heading}>
                    <SmallHeadingWithBack navigation={navigation}>
                        {en.addRoomie.heading}
                    </SmallHeadingWithBack>
                </View>
                <ScreenPadding style={styles.inner}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAvoidingView behavior="padding">
                            <NormalText>{en.addRoomie.info}</NormalText>
                            <Box />
                            <AddRoomieInput
                                onChange={(emails, valid) =>
                                    setEmailValid(true)
                                }
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </ScreenPadding>
                <Box />
                <View style={styles.saveButton}>
                    <PrimaryButton
                        onPress={() => {
                            transitFlatprofile.roommateEmails.forEach((email) =>
                                dispatch(postRoommateToFlat(email))
                            );
                            navigation.goBack();
                        }}
                    >
                        Save
                    </PrimaryButton>
                </View>
            </ScreenContainer>
        );
    } else {
        return (
            <ScreenContainer
                navigation={navigation}
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
                                onChange={(emails, valid) =>
                                    setEmailValid(true)
                                }
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </ScreenPadding>
            </ScreenContainer>
        );
    }
};
export default AddRoomie;
