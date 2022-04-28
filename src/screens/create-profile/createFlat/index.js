import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../../components/input';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import { pickImage } from '../../../helper/imageHandler';
import PictureInput from '../../../components/pictureInput';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';

const CreateFlat = ({ navigation }) => {
    const dispatch = useDispatch();
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const [flat, setFlat] = useState(transitFlatprofile);

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                dispatch(setTransitAttributes(flat, 'flatprofiles'));
                navigation.navigate('RoomInfo');
            }}
            nextDisabled={
                !flat.name ||
                flat.name.length < 1 ||
                !flat.pictureReferences ||
                flat.pictureReferences.length < 1
            }
        >
            <ScreenPadding>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding">
                        <Heading>{en.createFlat.heading}</Heading>
                        <NormalText>{en.createFlat.info}</NormalText>
                        <Box />
                        <Box />
                        <Box />
                        <Box style={{ alignItems: 'center' }}>
                            <PictureInput
                                variant={'profile'}
                                onPressDelete={() => {
                                    setFlat({
                                        ...flat,
                                        pictureReferences: [],
                                    });
                                }}
                                image={
                                    flat.pictureReferences
                                        ? flat.pictureReferences[0]
                                        : undefined
                                }
                                onPressSelect={async () => {
                                    const uri = await pickImage();
                                    setFlat({
                                        ...flat,
                                        pictureReferences: [uri],
                                    });
                                }}
                            />
                        </Box>
                        <Input
                            label={en.createFlat.name}
                            defaultValue={flat.name}
                            onChangeText={(text) => {
                                setFlat({
                                    ...flat,
                                    name: text,
                                });
                            }}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScreenPadding>
        </Container>
    );
};
export default CreateFlat;
