import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AddressMap } from '../../../components/addressMap';
import { Input } from '../../../components/input';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { postFlatprofile } from '../../../redux/actions/postFlatprofile';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const AddAddress = ({ navigation }) => {
    const dispatch = useDispatch();
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [flat, setFlat] = useState(transitFlatprofile);
    const [address, setAddress] = useState(flat.address);
    const [addressValid, setAddressValid] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    return (
        <ScreenContainer
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                if (!flatprofile.profileId) {
                    delete flat.addressCoordinates;
                    dispatch(
                        postFlatprofile({
                            ...flat,
                            address: address,
                        })
                    );
                }
                dispatch(
                    setTransitAttributes(
                        {
                            address: address,
                            addressCoordinates: coordinates,
                        },
                        'flatprofile'
                    )
                );
                navigation.navigate('RoomInfo');
            }}
            nextDisabled={addressValid === false}
        >
            <ScreenPadding>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding">
                        <Heading>{en.addAddress.heading}</Heading>
                        <NormalText>{en.addAddress.info}</NormalText>
                        <Box />
                        <Input
                            label={en.roomInfo.address}
                            error={addressValid === false}
                            defaultValue={flat.address ? flat.address : ''}
                            onChangeText={(text) => {
                                setAddress(text);
                            }}
                            onEndEditing={() =>
                                setFlat({
                                    ...flat,
                                    address: address,
                                })
                            }
                        />
                        {address && address != '' ? (
                            <>
                                <View style={styles.map}>
                                    <AddressMap
                                        address={address}
                                        resolveAddress
                                        onError={() => setAddressValid(false)}
                                        onSuccess={(lat, lng) => {
                                            setAddressValid(true);
                                            setCoordinates({
                                                latitude: lat,
                                                longitude: lng,
                                            });
                                        }}
                                    />
                                </View>
                                <Box />
                            </>
                        ) : null}
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScreenPadding>
        </ScreenContainer>
    );
};
export default AddAddress;
