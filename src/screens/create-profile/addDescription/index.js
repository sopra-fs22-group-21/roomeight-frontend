import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Gender from '../../../components/gender';
import { Input, InputBox, StyledTextInput } from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import { Container, Heading } from '../../../components/theme';
import { PickImage } from '../../../helper/imageHandler';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import genders from '../../../resources/strings/genders';
import styles from './styles';

const AddDescription = ({ navigation }) => {
    const [description, setDescription] = useState(null);
    const dispatch = useDispatch();

    const { userprofile } = useSelector((state) => state.userprofileState);
    let selectedTags = [];

    return (
        <Container showLogout>
            <Heading>{en.addDescription.heading}</Heading>
            <KeyboardAvoidingView style={styles.inner} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InputBox
                        label={en.addDescription.description}
                        style={styles.box}
                    >
                        <StyledTextInput
                            multiline
                            onChangeText={(text) =>
                                setDescription({
                                    ...description,
                                    description: text,
                                })
                            }
                        ></StyledTextInput>
                    </InputBox>
                    <NavigationButtons
                        onPressNext={() => navigation.navigate('ChooseStatus')}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};
export default AddDescription;
