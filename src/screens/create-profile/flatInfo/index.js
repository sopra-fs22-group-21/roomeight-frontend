import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, InputBox, StyledTextInput } from '../../../components/input';
import { ScreenContainer } from '../../../components/screenContainer';
import Tags from '../../../components/tags';
import {
    Box,
    Heading,
    NormalText,
    ScreenPadding,
} from '../../../components/theme';
import { setTransitAttributes } from '../../../redux/actions/setTransitAttributes';
import en from '../../../resources/strings/en.json';
import styles from './styles';

const FlatInfo = ({ navigation }) => {
    const { transitFlatprofile } = useSelector((state) => state.transitState);
    const [flat, setFlat] = useState(transitFlatprofile);
    const dispatch = useDispatch();

    return (
        <ScreenContainer
            navigation={navigation}
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                //hier post?
                dispatch(setTransitAttributes(flat, 'flatprofile'));
                navigation.navigate('AddRoomie', 'complete');
            }}
            nextDisabled={!flat.biography}
        >
            <ScreenPadding style={styles.inner}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding">
                        <Heading>{en.flatInfo.heading}</Heading>
                        <NormalText>{en.flatInfo.info}</NormalText>
                        <Box />
                        <InputBox label={en.flatInfo.tags}>
                            <Tags
                                selected={flat.tags}
                                onChange={(tags) =>
                                    setFlat({
                                        ...flat,
                                        tags: tags,
                                    })
                                }
                            />
                        </InputBox>

                        <Input
                            label={en.flatInfo.biography}
                            multiline
                            defaultValue={flat.biography}
                            placeholder={en.flatInfo.biographyPlaceholder}
                            onChangeText={(text) => {
                                setFlat({
                                    ...flat,
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
                                    defaultValue={flat.description}
                                    onChangeText={(text) =>
                                        setFlat({
                                            ...flat,
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
        </ScreenContainer>
    );
};
export default FlatInfo;
