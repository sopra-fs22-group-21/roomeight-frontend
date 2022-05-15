import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../../components/input';
import PictureInput from '../../../components/pictureInput';
import { ScreenContainer } from '../../../components/screenContainer';
import {
    Box,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { pickImage } from '../../../helper/imageHandler';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';

const CreateFlat = ({ navigation }) => {
    const dispatch = useDispatch();
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const [flat, setFlat] = useState(
        flatprofile ? flatprofile : transitFlatprofile
    );

    return (
        <ScreenContainer
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                dispatch(setTransitAttributes(flat, 'flatprofiles'));
                navigation.navigate('AddAddress');
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
        </ScreenContainer>
    );
};
export default CreateFlat;
