import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Gender from '../../../components/gender';
import { Input, InputBox } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import PictureInput from '../../../components/pictureInput';
import { Container, Heading } from '../../../components/theme';
import { PickImage } from '../../../helper/imageHandler';
import { addPictureReference } from '../../../redux/actions/addPictureReference';
import en from '../../../resources/strings/en.json';
import genders from '../../../resources/strings/genders';
import styles from './styles';

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
                        <PictureInput
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
