import React, { useState } from 'react';
import styles from './style';
import en from '../../../resources/strings/en.json';
import { Input, InputBox } from '../../../components/input';
import {
    TextBlock,
    Heading,
    Box,
    Title,
    Container,
    Inner,
} from '../../../components/theme';
import inputstyle from '../../../components/input';
import {
    Button,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    View,
} from 'react-native';
import Gender from '../../../components/gender';
import genders from '../../../resources/strings/genders';
import { NavigationButtons } from '../../../components/navigationButtons';
import ProfilePictureInput from '../../../components/profilePictureInput';
import { PickImage } from '../../../helper/imageHandler';
import { uploadImages } from '../../../redux/actions/uploadImage';
import { useDispatch } from 'react-redux';
import { addPictureReference } from '../../../redux/actions/addPictureReference';

const AddProfilePicture = ({ navigation }) => {
    const [gender, setGender] = useState(genders.notSet);
    const [user, setDescription] = useState(null);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    let selectedTags = [];

    return (
        <Container showLogout>
            <Heading>{en.addProfilePicture.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                        <ProfilePictureInput
                            onPressDelete={() => {
                                setImage('');
                            }}
                            variant="profile"
                            image={image}
                            initials="JK"
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
                        label={en.addProfilePicture.whoIAm}
                        multiline
                        onChangeText={(text) =>
                            setDescription({ ...user, description: text })
                        }
                    />
                    <NavigationButtons
                        onPressNext={() => {
                            dispatch(addPictureReference(image));
                            navigation.navigate('ChooseStatus');
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default AddProfilePicture;
