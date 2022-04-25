import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Gender from '../../../components/gender';
import { Input, InputBox, StyledTextInput } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import PictureInput from '../../../components/pictureInput';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { PickImage } from '../../../helper/imageHandler';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import genders from '../../../resources/strings/genders';
import styles from './styles';

const AddProfilePicture = ({ navigation, route }) => {
    const [gender, setGender] = useState(genders.notSet);
    const [biography, setBiography] = useState(null);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const navigate = route.params.includes('single')
        ? () => navigation.navigate('AddPictures', 'single')
        : () => navigation.navigate('AddPictures', 'flat');

    const { userprofile } = useSelector((state) => state.userprofileState);
    let selectedTags = [];

    /* function getInitials() {
        let firstLetter = userprofile.firstName.charAt(0);
        let lastLetter = userprofile.lastName.charAt(0);
        return firstLetter + lastLetter;
    } */

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                console.log(image);
                if (image) {
                    const attributes = {
                        localPictureReference: [image],
                        gender: gender,
                        ...biography,
                    };
                } else {
                    const attributes = {
                        gender: gender,
                        ...biography,
                    };
                    dispatch(setTransitAttributes(attributes, 'userprofile'));
                }
                navigate();
            }}
            nextDisabled={!image || !biography}
        >
            <ScreenPadding>
                <KeyboardAvoidingView style={styles.inner} behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{en.addProfilePicture.heading}</Heading>
                        <NormalText>{en.addProfilePicture.info}</NormalText>
                        <Box />

                        <Box style={{ alignItems: 'center' }}>
                            <PictureInput
                                onPressDelete={() => {
                                    setImage('');
                                }}
                                variant="profile"
                                image={image}
                                //initials={getInitials()}
                                onPressSelect={async () => {
                                    const uri = await PickImage();
                                    setImage(uri);
                                }}
                            />
                        </Box>
                        <InputBox label={en.addProfilePicture.gender}>
                            <Gender
                                onChange={(g) => {
                                    setGender(g);
                                }}
                            />
                        </InputBox>
                        <Input
                            //style={(inputstyle.Input, styles.textInput)}
                            label={en.addProfilePicture.biography}
                            multiline
                            placeholder={
                                en.addProfilePicture.biographyPlaceholder
                            }
                            onChangeText={(text) =>
                                setBiography({
                                    ...biography,
                                    biography: text,
                                })
                            }
                        />

                        <InputBox
                            label={en.addProfilePicture.description}
                            style={styles.box}
                        >
                            <StyledTextInput
                                multiline
                                placeholder={
                                    en.addProfilePicture.descriptionPlaceholder
                                }
                                onChangeText={(text) =>
                                    setDescription({
                                        ...description,
                                        description: text,
                                    })
                                }
                            ></StyledTextInput>
                        </InputBox>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenPadding>
        </Container>
    );
};
export default AddProfilePicture;
