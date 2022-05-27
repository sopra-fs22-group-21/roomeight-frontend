import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setTransitAttributes } from '../../redux/actions/setTransitAttributes';
import en from '../../resources/strings/en.json';
import { SecondaryButton } from '../button';
import { Input } from '../input';

//always writes emails into transitstate
export const AddRoomieInput = (props) => {
    const dispatch = useDispatch();
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const [nrEmails, setNrEmails] = useState(1);
    const [emailValid, setEmailValid] = useState(null);

    const [roomMates, setRoommates] = useState([{ id: 0 }]);

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
                error={emailValid === false}
                valid={emailValid}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                    setEmailValid(false);
                    const copy = [...roomMates];
                    copy[item.id].email = text;
                    setRoommates(copy);
                    if (emailRegex.test(text)) {
                        setEmailValid(true);
                        if (props.onChange) props.onChange(copy, true);
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
                    } else {
                        props.onChange(roomMates, false);
                        setEmailValid(null);
                    }
                }}
            />
        );
    };

    return (
        <>
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
                {en.addRoomie.addAnother}
            </SecondaryButton>
        </>
    );
};
