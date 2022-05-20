import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileInfoBox } from '../../../../components/profiles';
import { Box, NormalText, Title } from '../../../../components/theme';
import { Tab } from 'react-native-elements/dist/tab/Tab';
import {
    Text,
    View,
    Modal,
    Pressable,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { SecondaryButton } from '../../../../components/button';
import styles from './styles';
import LikesList from '../../../../components/likesList';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import en from '../../../../resources/strings/en.json';
import M8Loader from '../../../../../assets/logo/M8Loader';
import { EmptyCard } from '../../../../components/publicProfileCard';

const LikesFlat = ({ navigation }, props) => {
    const { likes, loading } = useSelector((state) => state.likesState);
    const [modalVisible, setModalVisible] = useState(false);
    const { flatprofile } = useSelector((state) => state.flatprofileState);
    const [likesOfProfile, setLikesOfProfile] = useState(null);
    //if (loading) return <M8Loader/>;
    function countLikes(profileId) {
        if (flatprofile.likes) {
            const filtered = flatprofile.likes.filter((like) => {
                return Object.keys(like.likedUser)[0] === profileId;
            });
            if (filtered.length !== 0) {
                return filtered[0].likes.length;
            } else {
                return 0;
            }
        } else {
            return null;
        }
    }
    if (likes.length < 1)
        return (
            <>
                <Box />
                <NormalText>{en.matches.incompleteMatchesInfo}</NormalText>
                <EmptyCard textIfNoData={en.matches.noIncompleteMatches} />
            </>
        );

    return (
        <View>
            <Box />
            <Box>
                <NormalText>{en.matches.incompleteMatchesInfo}</NormalText>
            </Box>
            {likes
                .map((like) => like.likedUser)
                .map((like) => Object.values(like)[0])
                .map((profile, index) => {
                    if (profile.profileId)
                        return (
                            <ProfileInfoBox
                                navigation={navigation}
                                profile={profile}
                                id={profile.profileId}
                                key={index}
                                onPress={(id) => {
                                    navigation.navigate('Match', {
                                        profile: profile,
                                    });
                                }}
                                onClickShowLikes={() => {
                                    setModalVisible(true);
                                    setLikesOfProfile(profile);
                                }}
                                nrLiked={countLikes(profile.profileId)}
                                nrRoommates={
                                    flatprofile.roomMates
                                        ? Object.keys(flatprofile.roomMates)
                                              .length
                                        : null
                                }
                            />
                        );
                })}

            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Icon
                                style={styles.icon}
                                name="x"
                                type="feather"
                                size={24}
                                color={'black'}
                                onPress={() => setModalVisible(false)}
                            />
                            <View style={styles.modalInner}>
                                <Title>Likes Overview</Title>
                                <Box />
                                <LikesList
                                    flatprofile={flatprofile}
                                    userprofile={likesOfProfile}
                                />
                                <Box />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default LikesFlat;
