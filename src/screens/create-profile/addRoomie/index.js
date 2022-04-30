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

const AddRoomie = ({ navigation }) => {
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const dispatch = useDispatch();
    const [emailValid, setEmailValid] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclose();
    const { userprofileErrors, authErrors } = useSelector(
        (state) => state.errorState
    );
    const [user, setUser] = useState({});

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    var initialElements = [];

    const [nrEmails, setNrEmails] = useState(0);

    const [roomMates, setRoommates] = useState(initialElements);

    const addElement = () => {
        var newArray = [...roomMates, { id: nrEmails }];
        setRoommates(newArray);
        setNrEmails(nrEmails + 1);
    };

    const renderItem = ({ item }) => {
        return (
            <Input
                key="email"
                label={'Email ' + (item.id + 1)}
                value={user.email}
                error={
                    emailValid === false || userprofileErrors.postUserprofile
                }
                valid={emailValid}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                    const copy = [...roomMates];
                    copy[item.id].email = text;
                    setRoommates(copy);
                    if (emailRegex.test(text)) {
                        setEmailValid(true);
                        console.log(emailValid);
                    } else {
                        setEmailValid(null);
                    }
                }}
            />
        );
    };

    return (
        <ScreenContainer
            navigation={navigation}
            //TODO: edit
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                dispatch(
                    setTransitAttributes(
                        {
                            roommateEmails: roomMates.map(
                                (roomMate) => roomMate.email
                            ),
                        },
                        'flatprofile'
                    )
                );
                navigation.navigate('AddPictures', 'flat');
            }}
            nextDisabled={!emailValid}
        >
            <ScreenPadding style={styles.inner}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding">
                        <Heading>{en.addRoomie.heading}</Heading>
                        <NormalText>{en.addRoomie.info}</NormalText>
                        <Box />
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={roomMates}
                            renderItem={renderItem}
                        />

                        <SecondaryButton
                            onPress={() => {
                                addElement();
                                setEmailValid(false);
                            }}
                        >
                            Add another room8
                        </SecondaryButton>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScreenPadding>
        </ScreenContainer>
    );
};
export default AddRoomie;
