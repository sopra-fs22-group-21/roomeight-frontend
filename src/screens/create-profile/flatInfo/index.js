import dateFormat from 'dateformat';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import DateInput from '../../../components/dateInput';
import {
    Input,
    InputBox,
    InputLabel,
    StyledTextInput,
} from '../../../components/input';
import { NavigationButtons } from '../../../components/navigationButtons';
import Tags from '../../../components/tags';
import {
    Box,
    Container,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import en from '../../../resources/strings/en.json';
import styles from './styles';

//TODO: backend, regex

const FlatInfo = ({ navigation }) => {
    const [moveInDateValid, setMoveInDateValid] = useState(null);
    const [moveOutDateValid, setMoveOutDateValid] = useState(null);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [rent, setRent] = useState(null);
    const [roomSize, setRoomSize] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const [nrRoommates, setNrRoommates] = useState(null);
    const [nrBathrooms, setNrBathrooms] = useState(null);
    let selectedTags = [];

    function changeToTemporary() {
        setTemporary(true);
        setPermanent(false);
    }

    function changeToPermanent() {
        setTemporary(false);
        setPermanent(true);
    }

    return (
        <Container
            onPressBack={() => navigation.goBack()}
            onPressNext={() =>
                navigation.navigate('CompletePersonalProfile', 'flat')
            }
        >
            <ScreenPadding style={styles.inner}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    <KeyboardAvoidingView behavior="position">
                        <Heading>{en.flatInfo.heading}</Heading>
                        <NormalText>{en.flatInfo.info}</NormalText>
                        <Box />
                        <InputBox label={en.flatInfo.tags}>
                            <Tags
                                onChange={(tags) =>
                                    setUser({
                                        ...user,
                                        tags: tags,
                                    })
                                }
                            />
                        </InputBox>

                        <Input
                            label={en.flatInfo.biography}
                            multiline
                            placeholder={en.flatInfo.biographyPlaceholder}
                            onChangeText={(text) => {
                                setUser({
                                    ...user,
                                    biography: text,
                                });
                            }}
                        />
                        <InputBox
                            label={en.flatInfo.description}
                            style={styles.box}
                        >
                            <Box>
                                <StyledTextInput
                                    multiline
                                    onChangeText={(text) =>
                                        setDescription({
                                            ...description,
                                            description: text,
                                        })
                                    }
                                    placeholder={
                                        en.flatInfo.descriptionPlaceholder
                                    }
                                ></StyledTextInput>
                            </Box>
                        </InputBox>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ScreenPadding>
        </Container>
    );
};
export default FlatInfo;
