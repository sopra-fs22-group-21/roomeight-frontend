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
import { Button, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import Gender from '../../components/gender';
import genders from '../../resources/strings/genders';

const AddProfilePicture = ({ navigation }) => {
    const [gender, setGender] = useState(genders.notSet);
    const [user, setDescription] = useState(null);
    let selectedTags = [];
    return (
        <Container showLogout>
            <Heading>{en.addProfilePicture.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InputBox label={en.addProfilePicture.gender}>
                        <Gender
                            onChange={(g) => {
                                setGender(g);
                                console.log(g);
                            }}
                        />
                    </InputBox>
                    <Input
                        label={en.addProfilePicture.whoIAm}
                        onChangeText={(text) =>
                            setDescription({ ...user, description: text })
                        }
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default AddProfilePicture;
