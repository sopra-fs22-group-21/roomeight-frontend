import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Gender from '../../../components/gender';
import { Input, InputBox, StyledTextInput } from '../../../components/input';
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

const CompletePersonalProfile = ({ navigation, route }) => {
    const [gender, setGender] = useState(genders.notSet);
    const [biography, setBiography] = useState(null);
    const [description, setDescription] = useState(null);
    const dispatch = useDispatch();

    const navigate = route.params.includes('single')
        ? () => navigation.navigate('AddPictures', route.params)
        : () => navigation.navigate('Done', route.params);

    const { userprofile } = useSelector((state) => state.userprofileState);
    const { transitUserprofile } = useSelector((state) => state.transitState);
    const [image, setImage] = useState(
        transitUserprofile.localPictureReference
    );

    const getInitials = () => {
        let firstLetter = userprofile.firstName
            ? userprofile.firstName.charAt(0)
            : '';
        let lastLetter = userprofile.lastName
            ? userprofile.lastName.charAt(0)
            : '';
        return firstLetter + lastLetter;
    };

    const cache = () => {
        const attributes = {
            localPictureReference: image ? [image] : undefined,
            gender: gender,
            ...biography,
            ...description,
        };
        dispatch(setTransitAttributes(attributes, 'userprofile'));
    };
    return (
        <Container
            onPressBack={() => {
                cache();
                navigation.goBack();
            }}
            onPressNext={() => {
                cache();
                navigate();
            }}
            nextDisabled={
                route.params.includes('single') &&
                ((!image &&
                    !userprofile.pictureReference &&
                    !transitUserprofile.pictureReference) ||
                    (!biography &&
                        !userprofile.biography &&
                        !transitUserprofile.biography) ||
                    (!gender &&
                        !userprofile.gender &&
                        !transitUserprofile.gender))
            }
        >
            <ScreenPadding>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView
                        style={styles.inner}
                        behavior="padding"
                    >
                        <Heading>{en.completePersonalProfile.heading}</Heading>
                        <NormalText>
                            {en.completePersonalProfile.info}
                        </NormalText>
                        <Box />

                        <Box style={{ alignItems: 'center' }}>
                            <PictureInput
                                variant={'profile'}
                                onPressDelete={() => {
                                    setImage('');
                                }}
                                image={image}
                                initials={getInitials()}
                                onPressSelect={async () => {
                                    const uri = await PickImage();
                                    setImage(uri);
                                }}
                            />
                        </Box>
                        <InputBox label={en.completePersonalProfile.gender}>
                            <Gender
                                onChange={(g) => {
                                    setGender(g);
                                }}
                                defaultValue={
                                    userprofile.gender
                                        ? userprofile.gender
                                        : transitUserprofile.gender
                                }
                            />
                        </InputBox>
                        <Input
                            label={en.completePersonalProfile.biography}
                            multiline
                            placeholder={
                                en.completePersonalProfile.biographyPlaceholder
                            }
                            onChangeText={(text) => {
                                setBiography({ ...biography, biography: text });
                            }}
                            defaultValue={
                                biography && biography.biography
                                    ? biography
                                    : userprofile.biography
                                    ? userprofile.biography
                                    : transitUserprofile.biography
                            }
                        />

                        <InputBox
                            label={en.completePersonalProfile.description}
                            style={styles.box}
                        >
                            <StyledTextInput
                                multiline
                                placeholder={
                                    en.completePersonalProfile
                                        .descriptionPlaceholder
                                }
                                onChangeText={(text) =>
                                    setDescription({
                                        ...description,
                                        description: text,
                                    })
                                }
                                defaultValue={
                                    description && description.description
                                        ? description.description
                                        : userprofile.description
                                        ? userprofile.description
                                        : transitUserprofile.description
                                }
                            ></StyledTextInput>
                        </InputBox>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScreenPadding>
        </Container>
    );
};
export default CompletePersonalProfile;
