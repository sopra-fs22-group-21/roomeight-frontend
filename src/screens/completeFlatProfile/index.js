import React, { useState } from 'react';
import styles from './style';
import en from '../../resources/strings/en.json';
import { Input, InputBox, InputLabel } from '../../components/input';
import {
    TextBlock,
    Heading,
    Box,
    Title,
    Container,
    Inner,
} from '../../components/theme';
import { Button, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import DateInput from '../../components/dateInput';
import dateFormat from 'dateformat';
import Tags from '../../components/tags';
import Dropdown from '../../components/dropdownMenu';

//TODO: backend, regex

const CompleteFlatProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [rent, setRent] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [RoomMates, setRoomMates] = useState(null);
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
        <Container showLogout>
            <Heading>{en.completeFlatProfile.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        label={en.completeFlatProfile.address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <DateInput
                        label={en.completeFlatProfile.moveInDate}
                        valid={moveInDateValid}
                        onChange={(date, valid) => {
                            if (valid)
                                setUser({
                                    ...user,
                                    moveInDate: dateFormat(date, 'yyyy-mm-dd'),
                                });
                            setmoveInDateValid(valid);
                        }}
                    />
                    <InputLabel children={en.completeFlatProfile.duration} />
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
                            onPress={() => changeToPermanent()}
                        />
                    </Box>
                    <Input
                        label={en.completeFlatProfile.rent}
                        onChangeText={(text) => setRent(text)}
                    />
                    <Input
                        label={en.completeFlatProfile.roomSize}
                        onChangeText={(text) => setRoomSize(text)}
                    />
                    <InputBox label={en.completeFlatProfile.tags}>
                        <Tags onChange={(tags) => console.log(tags)} />
                    </InputBox>
                    <Dropdown />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default CompleteFlatProfile;
