import React, { useState } from 'react';
import styles from './style';
import en from '../../resources/strings/en.json';
import { Input, InputBox } from '../../components/input';
import {
    TextBlock,
    Heading,
    Box,
    Title,
    Container,
    Inner,
} from '../../components/theme';
import inputstyle from '../../components/input';
import { Button, ScrollView, KeyboardAvoidingView, Text, View } from 'react-native';
import Gender from '../../components/gender';
import genders from '../../resources/strings/genders';
import { NavigationButtons } from '../../components/navigationButtons';
import ProfilePictureInput from '../../components/profilePictureInput';

const AddProfilePicture = ({ navigation }) => {
    const [gender, setGender] = useState(genders.notSet);
    const [user, setDescription] = useState(null);
    let selectedTags = [];
    return (
        <Container showLogout>
            <Heading>{en.addProfilePicture.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1, width: '100%'}}>
                        <ProfilePictureInput />
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
                        onPressNext={() => navigation.navigate('ChooseStatus')}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default AddProfilePicture;
