import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateInput from '../../../components/dateInput';
import { InputBox } from '../../../components/input';
import { ScreenContainer } from '../../../components/screenContainer';
import { MoveInMoveOutInput } from '../../../components/moveInMoveOutInput';
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
                        <MoveInMoveOutInput
                            allowPermanentNull={false}
                            moveInDate={
                                userprofile.moveInDate
                                    ? new Date(userprofile.moveInDate)
                                    : transitUserprofile.moveInDate
                                    ? new Date(transitUserprofile.moveInDate)
                                    : undefined
                            }
                            moveOutDate={
                                userprofile.moveOutDate
                                    ? new Date(userprofile.moveOutDate)
                                    : transitUserprofile.moveOutDate
                                    ? new Date(transitUserprofile.moveOutDate)
                                    : undefined
                            }
                            permanent={user.moveOutDate == undefined}
                            onSetMoveInDate={(date) => {
                                setUser({
                                    ...user,
                                    moveInDate: date.toJSON(),
                                });
                            }}
                            onSetMoveOutDate={(date) => {
                                if (date != '')
                                    setUser({
                                        ...user,
                                        moveOutDate: date.toJSON(),
                                    });
                            }}
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
