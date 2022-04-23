import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Gender from '../../../components/gender';
import { Input, InputBox } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import PictureInput from '../../../components/pictureInput';
import { Container, Heading } from '../../../components/theme';
import { PickImage } from '../../../helper/imageHandler';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import genders from '../../../resources/strings/genders';
import styles from './styles';

const AddProfilePicture = ({ navigation }) => {
    const [gender, setGender] = useState(genders.notSet);
    const [biography, setBiography] = useState(null);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const { userprofile } = useSelector((state) => state.userprofileState);
    let selectedTags = [];

    /* function getInitials() {
        let firstLetter = userprofile.firstName.charAt(0);
        let lastLetter = userprofile.lastName.charAt(0);
        return firstLetter + lastLetter;
    } */

    return (
        <Container showLogout>
            <Heading>{en.addProfilePicture.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
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
                    </View>
                    <InputBox label={en.addProfilePicture.gender}>
                        <Gender
                            onChange={(g) => {
                                setGender(g);
                                console.log(g);
                            }}
                        />
                    </InputBox>
                    <Input
                        //style={(inputstyle.Input, styles.textInput)}
                        label={en.addProfilePicture.biography}
                        multiline
                        onChangeText={(text) =>
                            setBiography({
                                ...biography,
                                biography: text,
                            })
                        }
                    />
                    <NavigationButtons
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
                                dispatch(
                                    setTransitAttributes(
                                        attributes,
                                        'userprofile'
                                    )
                                );
                            }
                            navigation.navigate('ChooseStatus');
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default AddProfilePicture;
