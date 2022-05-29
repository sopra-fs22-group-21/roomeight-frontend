import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddRoomieInput } from '../../../components/addRoomieInput';
import { PrimaryButton } from '../../../components/button';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Heading,
    NormalText,
    ScreenPadding,
    SmallHeadingWithBack,
} from '../../../components/theme';
import { postRoommateToFlat } from '../../../redux/actions/postFlatprofile';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const AddRoomie = ({ navigation, route }) => {
    const [emailValid, setEmailValid] = useState(null);
    const profileRoot = route.params.includes('profile');
    const dispatch = useDispatch();
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);

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
                            if (transitFlatprofile.roommateEmails) {
                                transitFlatprofile.roommateEmails.forEach(
                                    (email) =>
                                        dispatch(postRoommateToFlat(email))
                                );
                                navigation.goBack();
                            }
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
