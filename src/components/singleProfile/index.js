import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../components/button';
import { Input, InputBox } from '../../components/input';
import Tags from '../../components/tags';
import { updateProfile } from '../../redux/actions/updateActions';
import en from '../../resources/strings/en.json';
import { MoveInMoveOutInput } from '../moveInMoveOutInput';
import { PictureInputGallery } from '../pictureInputGallery';
import { PublicProfileCard } from '../publicProfileCard';
import { Box } from '../theme';
import styles from './styles';

const SingleProfile = (_props) => {
    const dispatch = useDispatch();
    const { userprofile } = useSelector((state) => state.userprofileState);
    const [user, setUser] = useState({});

    const [editMode, setEditMode] = useState(false);

    if (editMode) {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.inner}
                    behavior="padding"
                >
                    <PictureInputGallery
                        profile={userprofile}
                        onChange={(images) =>
                            setUser({
                                ...user,
                                pictureReferences: images,
                            })
                        }
                    />
                    <View>
                        {userprofile.isSearchingRoom ? (
                            <MoveInMoveOutInput
                                allowPermanentNull={false}
                                moveInDate={
                                    userprofile.moveInDate
                                        ? new Date(userprofile.moveInDate)
                                        : undefined
                                }
                                moveOutDate={
                                    userprofile.moveOutDate
                                        ? new Date(userprofile.moveOutDate)
                                        : undefined
                                }
                                permanent={userprofile.moveOutDate == undefined}
                                onSetMoveInDate={(date) => {
                                    setUser({
                                        ...user,
                                        moveInDate: date.toJSON(),
                                    });
                                }}
                                onChangePermanent={(permanent) => {
                                    setUser({
                                        ...user,
                                        permanent: permanent,
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
                        ) : null}

                        <InputBox label={'Tags'}>
                            <Tags
                                selected={userprofile.tags}
                                onChange={(tags) =>
                                    setUser({
                                        ...user,
                                        tags: tags,
                                    })
                                }
                            />
                        </InputBox>
                        <Input
                            label={en.completePersonalProfile.biography}
                            defaultValue={userprofile.biography}
                            multiline
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    biography: text,
                                })
                            }
                        />
                        <Input
                            label={en.completePersonalProfile.description}
                            defaultValue={userprofile.description}
                            multiline
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    description: text,
                                })
                            }
                        />
                    </View>
                </KeyboardAwareScrollView>
                <Box />
                <PrimaryButton
                    onPress={() => {
                        setEditMode(false);
                        dispatch(
                            updateProfile(
                                user,
                                'userprofile',
                                userprofile.profileId
                            )
                        );
                    }}
                >
                    Save
                </PrimaryButton>
            </View>
        );
    } else {
        return (
            <PublicProfileCard
                profile={userprofile}
                onClickEdit={() => setEditMode(true)}
                isFlat={false}
            />
        );
    }
};
export default SingleProfile;
