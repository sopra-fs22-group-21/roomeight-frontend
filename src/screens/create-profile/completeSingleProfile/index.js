import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateInput from '../../../components/dateInput';
import { InputBox } from '../../../components/input';
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

const CompleteSingleProfile = ({ navigation }) => {
    const [moveInDateValid, setmoveInDateValid] = useState(null);
    const { userprofile } = useSelector((state) => state.userprofileState);
    const { transitUserprofile } = useSelector((state) => state.transitState);
    const [user, setUser] = useState(transitUserprofile);
    const dispatch = useDispatch();
    return (
        <ScreenContainer
            onPressBack={() => navigation.goBack()}
            onPressNext={() => {
                dispatch(setTransitAttributes({ ...user }, 'userprofile'));
                navigation.navigate('CompletePersonalProfile', 'single');
            }}
            nextDisabled={false}
        >
            <ScreenPadding>
                <KeyboardAvoidingView style={styles.inner} behavior="position">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Heading>{en.completeSingleProfile.heading}</Heading>
                        <NormalText>{en.completeSingleProfile.info}</NormalText>
                        <Box />
                        <DateInput
                            label={en.completeSingleProfile.moveInDate}
                            valid={moveInDateValid}
                            onChange={(date, valid) => {
                                if (valid)
                                    setUser({
                                        ...user,
                                        moveInDate: date.toJSON(),
                                    });
                                setmoveInDateValid(valid && date > new Date());
                            }}
                            defaultDate={
                                userprofile.moveInDate
                                    ? new Date(userprofile.moveInDate)
                                    : transitUserprofile.moveInDate
                                    ? new Date(transitUserprofile.moveInDate)
                                    : null
                            }
                        />

                        <InputBox label={'Tags'}>
                            <Tags
                                onChange={(tags) =>
                                    setUser({ ...user, tags: tags })
                                }
                                selected={
                                    userprofile.tags &&
                                    userprofile.tags.length > 0
                                        ? userprofile.tags
                                        : transitUserprofile.tags
                                }
                            />
                        </InputBox>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ScreenPadding>
        </ScreenContainer>
    );
};
export default CompleteSingleProfile;
