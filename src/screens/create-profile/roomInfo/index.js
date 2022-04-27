import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import DateInput from '../../../components/dateInput';
import { Input, InputLabel } from '../../../components/input';
import {
    Box,
    Container,
    Heading,
    ScreenPadding,
} from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const RoomInfo = ({ navigation }) => {
    const [moveInDateValid, setMoveInDateValid] = useState(null);
    const [moveOutDateValid, setMoveOutDateValid] = useState(null);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [rent, setRent] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [nrBathrooms, setNrBathrooms] = useState(null);
    let selectedTags = [];

    function changeToTemporary() {
        setTemporary(true);
        setPermanent(false);
    }

    function changeToPermanent() {
        setTemporary(false);
        setPermanent(true);
    }

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            onPressNext={() => navigation.navigate('FlatInfo')}
        >
            <ScreenPadding style={styles.inner}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{en.roomInfo.heading}</Heading>
                        <Input
                            label={en.roomInfo.address}
                            onChangeText={(text) => setAddress(text)}
                        />
                        <DateInput
                            label={en.roomInfo.moveInDate}
                            valid={moveInDateValid}
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        moveInDate: date.toJSON(),
                                    });
                                setMoveInDateValid(valid && date > new Date());
                            }}
                        />
                        <InputLabel>{en.roomInfo.duration}</InputLabel>
                        <Box style={styles.box}>
                            <CheckBox
                                containerStyle={styles.choice}
                                wrapperStyle={styles.wrapper}
                                textStyle={styles.text}
                                title={'Temporary'}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                color="#0E7490"
                                checked={temporary}
                                onPress={() => changeToTemporary()}
                            ></CheckBox>
                            <CheckBox
                                containerStyle={styles.choice}
                                wrapperStyle={styles.wrapper}
                                textStyle={styles.text}
                                title="Permanent"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                color="#0E7490"
                                checked={permanent}
                                onPress={() => {
                                    changeToPermanent();
                                    delete user.moveOutDate;
                                    setUser(user);
                                }}
                            ></CheckBox>
                        </Box>
                        {temporary ? (
                            <DateInput
                                label={en.roomInfo.moveOutDate}
                                valid={moveOutDateValid}
                                onChange={(date, valid) => {
                                    if (valid)
                                        setUser({
                                            ...user,
                                            moveOutDate: date.toJSON(),
                                        });
                                    setMoveOutDateValid(
                                        valid && moveOutDate > moveInDate
                                    );
                                }}
                            />
                        ) : null}
                        <Input
                            label={en.roomInfo.rent}
                            keyboardType="number-pad"
                            placeholder="CHF"
                            onChangeText={(text) => setRent(text)}
                        />
                        <Input
                            label={en.roomInfo.roomSize}
                            keyboardType="number-pad"
                            placeholder="m2"
                            onChangeText={(text) => setRoomSize(text)}
                        />
                        <Input
                            label={en.roomInfo.nrBathrooms}
                            keyboardType="number-pad"
                            onChangeText={(text) => setNrBathrooms(text)}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenPadding>
        </Container>
    );
};
export default RoomInfo;
