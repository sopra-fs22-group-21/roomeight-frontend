import dateFormat from 'dateformat';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import DateInput from '../../../components/dateInput';
import { Input, InputBox, InputLabel } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import Tags from '../../../components/tags';
import { Box, Container, Heading } from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';

//TODO: backend, regex

const CompleteFlatProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [rent, setRent] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [nrRoommates, setNrRoommates] = useState(null);
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
                    <InputLabel>{en.completeFlatProfile.duration}</InputLabel>
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
                        ></CheckBox>
                    </Box>
                    <Input
                        label={en.completeFlatProfile.rent}
                        keyboardType="number-pad"
                        placeholder="CHF"
                        onChangeText={(text) => setRent(text)}
                    />
                    <Input
                        label={en.completeFlatProfile.roomSize}
                        keyboardType="number-pad"
                        placeholder="m2"
                        onChangeText={(text) => setRoomSize(text)}
                    />
                    <InputBox label={en.completeFlatProfile.tags}>
                        <Tags onChange={(tags) => console.log(tags)} />
                    </InputBox>
                    <Input
                        label={en.completeFlatProfile.nrRoommates}
                        keyboardType="number-pad"
                        onChangeText={(text) => setNrRoommates(text)}
                    />
                    <Input
                        label={en.completeFlatProfile.nrBathrooms}
                        keyboardType="number-pad"
                        onChangeText={(text) => setNrBathrooms(text)}
                    />
                    <NavigationButtons
                        onPressBack={() => navigation.goBack()}
                        onPressNext={() =>
                            navigation.navigate('AddDescription')
                        }
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default CompleteFlatProfile;
