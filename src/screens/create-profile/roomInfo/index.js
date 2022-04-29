import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { View } from 'react-native-animatable';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import DateInput from '../../../components/dateInput';
import { AddressMap } from '../../../components/addressMap';
import { Input, InputLabel } from '../../../components/input';
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

const RoomInfo = ({ navigation }) => {
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const [moveInDateValid, setMoveInDateValid] = useState(null);
    const [moveOutDateValid, setMoveOutDateValid] = useState(null);
    const [addressValid, setAddressValid] = useState(true);
    const [rentValid, setRentValid] = useState(null);
    const [flat, setFlat] = useState(transitFlatprofile);
    const [roomSizeValid, setRoomSizeValid] = useState(null);
    const [nrBathroomsValid, setNrBathroomsValid] = useState(null);
    const [nrRoommatesValid, setNrRoommatessValid] = useState(null);
    const dispatch = useDispatch();

    function changeToTemporary() {
        setFlat({
            ...flat,
            permanent: false,
        });
    }

    function changeToPermanent() {
        delete flat.moveOutDate;
        setFlat({
            ...flat,
            permanent: true,
        });
    }

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                dispatch(setTransitAttributes(flat, 'flatprofile'));
                navigation.navigate('FlatInfo');
            }}
            nextDisabled={
                !flat.address ||
                flat.address.length < 1 ||
                //addressValid === false ||
                moveInDateValid === false ||
                moveOutDateValid === false ||
                rentValid === false ||
                roomSizeValid === false ||
                nrBathroomsValid === false ||
                (!flat.permanent && !flat.moveOutDate)
            }
        >
            <ScreenPadding style={styles.inner}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{en.roomInfo.heading}</Heading>
                        <NormalText>{en.roomInfo.info}</NormalText>
                        <Box />
                        <Input
                            label={en.roomInfo.address}
                            error={addressValid === false}
                            defaultValue={flat.address}
                            onChangeText={(text) =>
                                setFlat({
                                    ...flat,
                                    address: text,
                                })
                            }
                        />
                        {flat.address && flat.address != '' ? (
                            <>
                                <View style={styles.map}>
                                    <AddressMap
                                        address={flat.address}
                                        onError={() => setAddressValid(false)}
                                        onSuccess={() => setAddressValid(true)}
                                    />
                                </View>
                                <Box />
                            </>
                        ) : null}

                        <DateInput
                            label={en.roomInfo.moveInDate}
                            defaultDate={
                                flat.moveInDate
                                    ? new Date(flat.moveInDate)
                                    : null
                            }
                            onChange={(date, valid) => {
                                if (valid)
                                    setFlat({
                                        ...flat,
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
                                checked={!flat.permanent}
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
                                checked={flat.permanent}
                                onPress={() => {
                                    changeToPermanent();
                                }}
                            ></CheckBox>
                        </Box>
                        {!flat.permanent ? (
                            <DateInput
                                label={en.roomInfo.moveOutDate}
                                error={moveOutDateValid === false}
                                defaultDate={
                                    flat.moveOutDate
                                        ? new Date(flat.moveOutDate)
                                        : null
                                }
                                onChange={(date, valid) => {
                                    const isValid =
                                        valid &&
                                        date > new Date(flat.moveInDate);
                                    if (isValid)
                                        setFlat({
                                            ...flat,
                                            moveOutDate: date.toJSON(),
                                        });
                                    setMoveOutDateValid(isValid);
                                }}
                            />
                        ) : null}
                        <Input
                            label={en.roomInfo.rent}
                            keyboardType="number-pad"
                            error={rentValid === false}
                            placeholder="CHF"
                            defaultValue={flat.rent}
                            onChangeText={(text) => {
                                setRentValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    rent: Number(text),
                                });
                            }}
                        />
                        <Input
                            label={en.roomInfo.roomSize}
                            keyboardType="number-pad"
                            placeholder="m2"
                            error={roomSizeValid === false}
                            defaultValue={flat.roomSize}
                            onChangeText={(text) => {
                                setRoomSizeValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    roomSize: Number(text),
                                });
                            }}
                        />
                        <Input
                            label={en.flatInfo.nrRoommates}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setNrRoommatessValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    nrRoommates: Number(text),
                                });
                            }}
                        />
                        <Input
                            label={en.roomInfo.nrBathrooms}
                            keyboardType="number-pad"
                            placeholder="1"
                            error={nrBathroomsValid === false}
                            defaultValue={flat.nrBathrooms}
                            onChangeText={(text) => {
                                setNrBathroomsValid(!isNaN(Number(text)));
                                setFlat({
                                    ...flat,
                                    nrBathrooms: Number(text),
                                });
                            }}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenPadding>
        </Container>
    );
};
export default RoomInfo;
