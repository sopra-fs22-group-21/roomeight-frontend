import React, { useState } from 'react';
import { useRef } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { Input, InputBox, StyledTextInput } from '../../../components/input';
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
    const [user, setUser] = useState(null);
    const [temporary, setTemporary] = useState(false);
    const [permanent, setPermanent] = useState(false);
    const descInput = useRef(null);
    const bioInput = useRef(null);
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
            onPressNext={() => navigation.navigate('AddPictures', 'flat')}
        >
            <ScreenPadding style={styles.inner}>
                <KeyboardAvoidingView behavior="height">
                    <ScrollView showsVerticalScrollIndicator={false}>
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
                            ref={bioInput}
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
                            ref={descInput}
                        >
                            <Box>
                                <StyledTextInput
                                    multiline
                                    onChangeText={(text) =>
                                        setUser({
                                            ...user,
                                            description: text,
                                        })
                                    }
                                    placeholder={
                                        en.flatInfo.descriptionPlaceholder
                                    }
                                ></StyledTextInput>
                            </Box>
                        </InputBox>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenPadding>
        </Container>
    );
};
export default FlatInfo;
